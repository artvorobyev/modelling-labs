import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-lab2-page',
  templateUrl: './lab2-page.component.html',
  styleUrls: ['./lab2-page.component.scss'],
})
export class Lab2PageComponent implements OnInit {
  uniformA: number = 0;
  uniformB: number = 0;
  uniformStart: number = 0;
  uniformEnd: number = 0;
  showUniformCharts = false;
  uniformFunc: number[][] = [];
  uniformDensity: number[][] = [];

  poissonLambda: number = 0;
  poissonStart: number = 0;
  poissonEnd: number = 0;
  showPoissonCharts = false;
  poissonFunc: number[][] = [];
  poissonDensity: number[][] = [];

  chartOptions = {
    curveType: 'function',
    legend: { position: 'bottom' },
    width: '100%',
    height: 500,
  };

  ChartType = ChartType;

  constructor() {}

  ngOnInit(): void {}

  submitUniformData(event: Event): void {
    event.preventDefault();
    if (
      this.uniformStart >= this.uniformEnd ||
      this.uniformB <= this.uniformA
    ) {
      alert('Некорректные данные');
      return;
    }
    const uniformArr = this.fillArray(this.uniformStart, this.uniformEnd, 0.1);

    this.uniformFunc = uniformArr.map((x) => [
      x,
      this.uniform_function(this.uniformA, this.uniformB, x),
    ]);

    this.uniformDensity = uniformArr.map((x) => [
      x,
      this.uniform_density(this.uniformA, this.uniformB, x),
    ]);

    this.showUniformCharts = true;
  }

  submitPoissonData(event: Event): void {
    event.preventDefault();

    if (this.poissonStart >= this.poissonEnd || this.poissonLambda <= 0) {
      alert('Некорректные данные');
      return;
    }

    const poissonArr = this.fillArray(this.poissonStart, this.poissonEnd, 1);

    this.poissonFunc = poissonArr.map((x) => [
      x,
      this.poisson_function(x, this.poissonLambda),
    ]);

    this.poissonDensity = poissonArr.map((x) => [
      x,
      this.poisson_density(x, this.poissonLambda),
    ]);

    console.log(this.poissonFunc);
    console.log(this.poissonDensity);

    this.showPoissonCharts = true;
  }

  fillArray(start: number, end: number, h: number): number[] {
    let arr = [];
    for (let i = start; i <= end; i += h) {
      arr.push(i);
    }
    return arr;
  }

  uniform_density(a: number, b: number, x: number): number {
    if (x >= a && x <= b) {
      return 1 / (b / a);
    } else {
      return 0;
    }
  }

  uniform_function(a: number, b: number, x: number): number {
    if (x < a) {
      return 0;
    } else if (x >= b) {
      return 1;
    } else {
      return (x - a) / (b - a);
    }
  }

  poisson_density(k: number, lambda: number): number {
    const num = Math.exp(-1 * lambda) * lambda ** k;
    const znamen = this.factorial(k, 0);
    return num / znamen;
  }

  poisson_function(k: number, lambda: number) {
    const kk = Math.abs(k);
    let sum = 0;
    for (let i = 0; i <= kk; i++) {
      sum += lambda ** i / this.factorial(i, 0);
    }
    sum *= Math.exp(-1 * lambda);
    return sum;
  }

  factorial(n: number, result: number): number {
    result = result || 1;
    if (n <= 0) {
      return result;
    } else {
      return this.factorial(n - 1, result * n);
    }
  }
}
