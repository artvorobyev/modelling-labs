import streamlit as st
from st_aggrid import AgGrid
from math import fabs
from numpy.linalg.linalg import LinAlgError
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

TIME_DELTA = 1e-3
SEED = 17


def get_start_probabilities(n, all_equal=True):
    if all_equal:
        return [1 / n] * n
    else:
        res = [0] * n
        res[0] = 1
        return res


def output(title, caption, data, n=2):
    st.write(title)
    for i in range(len(data)):
        st.write(f"{caption}_{i} {round(fabs(data[i]), n)}")


def calc_probas(matrix, n):
    a = np.zeros((n, n))  # Матрица для решения СЛАУ
    b = np.zeros(n)  # Матрица для результатов

    for i in range(n - 1):
        for j in range(n):
            if i != j:
                a[i][j] += matrix[j][i]
            else:
                a[j][j] -= sum(matrix[j])
    a[-1] = np.ones(n)
    b[-1] = 1  # Нормализация матрицы

    try:
        p = np.linalg.solve(a, b)
    except np.linalg.LinAlgError:
        p = np.zeros(n)

    return p, b


@st.cache()
def get_data(n: int, vals: int) -> pd.DataFrame:
    arr_0 = np.zeros((n, n)).reshape(-1, n)
    arr_1 = np.ones((n, n)).reshape(-1, n)
    cols = [f"S_{i}" for i in range(n)]
    if vals == 0:
        df = pd.DataFrame(arr_0, columns=cols)
    elif vals == 1:
        df = pd.DataFrame(arr_1, columns=cols)
    else:
        df = pd.DataFrame(np.random.randint(0, 2, size=n * n).reshape(-1, n), columns=cols)
    return df


def plot_probability_over_time(probabilities, stabilization_time, times, probabilities_over_time):
    fig, ax = plt.subplots()
    for i_node in range(len(probabilities_over_time[0])):
        ax.plot(times, [i[i_node] for i in probabilities_over_time])
        ax.scatter(stabilization_time[i_node], probabilities[i_node])

    plt.title("Время стабилизации системы")
    ax.legend([f"S_{i}" for i in range(len(probabilities))])
    plt.xlabel('Время, t')
    plt.ylabel('Вероятность, p')
    plt.grid(True)
    st.pyplot(fig)


def dps(matrix, probabilities):
    n = len(matrix)
    return [
        TIME_DELTA * sum(
            [
                probabilities[j] * (-sum(matrix[i]) + matrix[i][i])
                if i == j else
                probabilities[j] * matrix[j][i]
                for j in range(n)
            ]
        )
        for i in range(n)
    ]


def calc_stabilization_times(matrix, start_probabilities, limit_probabilities, n, current_time=0):
    current_probabilities = start_probabilities.copy()
    stabilization_times = [0 for i in range(n)]

    total_lambda_sum = np.sum(matrix) * SEED
    cool_eps = [p / total_lambda_sum for p in limit_probabilities]

    while not all(stabilization_times):
        curr_dps = dps(matrix, current_probabilities)
        for i in range(n):
            if (not stabilization_times[i] and curr_dps[i] <= cool_eps[i] and
                    abs(current_probabilities[i] - limit_probabilities[i]) <= cool_eps[i]):
                stabilization_times[i] = current_time
            current_probabilities[i] += curr_dps[i]

        current_time += TIME_DELTA

    return stabilization_times


def calc_probability_over_time(matrix, start_probabilities, end_time):
    n = len(matrix)
    current_time = 0
    current_probabilities = start_probabilities.copy()

    probabilities_over_time = []
    times = []

    while current_time < end_time:
        probabilities_over_time.append(current_probabilities.copy())
        curr_dps = dps(matrix, current_probabilities)
        for i in range(n):
            current_probabilities[i] += curr_dps[i]

        current_time += TIME_DELTA

        times.append(current_time)

    return times, probabilities_over_time


def style():
    st.markdown(
        """
        <style>
        .reportview-container {
            background: silver
        }
        .markdown-text-container { 
            font-family: Arial
        }
        </style>
        """,
        unsafe_allow_html=True
    )


def main():
    style()

    c1, c2 = st.beta_columns(2)
    n = c1.selectbox("Задайте количество состояний системы, N:", ("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"), 3)
    values = c2.selectbox("Заполнить:", (1, "Случайные значения"))
    df = get_data(int(n), values)

    st.subheader("Введите значения интенсивности переходов, λ:")
    grid_return = AgGrid(
        df,
        editable=True,
        reload_data=False,
    )

    arr = grid_return["data"].to_numpy()

    # Предельные вероятности
    probas, start_probas = calc_probas(arr, int(n))
    st.write("Средний процент времени нахождения системы в предельном режиме в состоянии n:")
    for i in range(int(n)):
        pr = round(probas[i], 2)
        perc = round(pr * 100, 2)
        st.write(f"S_{i} - {perc}%")
    output('Предельные вероятности:', 'p', probas)

    # Время стабилизации
    start_probabilities = get_start_probabilities(int(n), all_equal=False)
    stabilization_time = calc_stabilization_times(arr.tolist(), start_probas.copy().tolist(), probas, int(n))
    output('Время стабилизации:', 't', stabilization_time)

    # Графики вероятностей, как функции времени
    times, probabilities_over_time = calc_probability_over_time(arr, start_probabilities, 3)
    plot_probability_over_time(probas, stabilization_time, times, probabilities_over_time)


if __name__ == "__main__":
    main()
