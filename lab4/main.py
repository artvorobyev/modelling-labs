from prettytable import PrettyTable
from numpy.random import gamma, normal, poisson
import random
import numpy as np
import math
from numpy import random as nr

class Generator:
    def __init__(self, generator):
        self._generator = generator
        self._receivers = set()

    def add_receiver(self, receiver):
        self._receivers.add(receiver)

    def remove_receiver(self, receiver):
        try:
            self._receivers.remove(receiver)
        except KeyError:
            pass

    def next_time(self):
        return self._generator.generate()

    def emit_request(self):
        for receiver in self._receivers:
            receiver.receive_request()



class Processor(Generator):
    def __init__(self, generator, reenter_probability=0):
        super().__init__(generator)
        self.current_queue_size = 0
        self.max_queue_size = 0
        self.processed_requests = 0
        self.reenter_probability = reenter_probability
        self.reentered_requests = 0

    def process(self):
        if self.current_queue_size > 0:
            self.processed_requests += 1
            self.current_queue_size -= 1
            self.emit_request()
            if nr.random_sample() <= self.reenter_probability:
                self.reentered_requests += 1
                self.receive_request()

    def receive_request(self):
        self.current_queue_size += 1
        if self.current_queue_size > self.max_queue_size:
            self.max_queue_size = self.current_queue_size




class UniformDistribution:
    def __init__(self, a: float, b: float):
        self.a = a
        self.b = b

    def generate(self):
        return self.a + (self.b - self.a) * random.random()

class PoissonDistribution:
    def __init__(self, k, l):
        self.k = k
        self.l = l

    def generate(self):
        return poisson(self.k, self.l)[1]


class Modeller:
    def __init__(self, uniform_a, uniform_b, er_k, er_l, reenter_prop):
        self._generator = Generator(UniformDistribution(uniform_a, uniform_b))
        self._processor = Processor(PoissonDistribution(er_k, er_l), reenter_prop)
        self._generator.add_receiver(self._processor)

    def event_based_modelling(self, request_count):
        generator = self._generator
        processor = self._processor

        gen_period = generator.next_time()
        proc_period = gen_period +processor.next_time()

        while processor.processed_requests < request_count:
            if gen_period <= proc_period:
                generator.emit_request()
                gen_period += generator.next_time()
            if gen_period >= proc_period:
                processor.process()
                if processor.current_queue_size > 0:
                    proc_period += processor.next_time()
                else:
                    proc_period = gen_period + processor.next_time()

        return (processor.processed_requests, processor.reentered_requests,
                processor.max_queue_size, round(proc_period, 3))

    def time_based_modelling(self, request_count, dt):
        generator = self._generator
        processor = self._processor

        gen_period = generator.next_time()
        proc_period = gen_period
        current_time = 0
        while processor.processed_requests < request_count:
            if gen_period <= current_time:
                generator.emit_request()
                gen_period += generator.next_time()
            if current_time >= proc_period:
                processor.process()
                if processor.current_queue_size > 0:
                    proc_period += processor.next_time()
                else:
                    proc_period = gen_period + processor.next_time()

            current_time += dt

        return (processor.processed_requests, processor.reentered_requests,
                processor.max_queue_size, round(current_time, 3))

if __name__ == '__main__':
    a, b = 0, 10

    er_k, er_lambda = 2, 2

    total_tasks = 10000
    repeat_probality = 0.99
    step = 0.01


    model = Modeller(a, b, er_k, er_lambda, repeat_probality)
    result1  = model.event_based_modelling(total_tasks)
    model2 = Modeller(a, b, er_k, er_lambda, repeat_probality)
    result2 = model2.time_based_modelling(total_tasks, step)

    print("Return probability: ", repeat_probality)
    table = PrettyTable()
    table.add_column("Method", ["Event", "Step"])
    table.add_column("Processed", [result1[0], result2[0]])
    table.add_column("Returned", [result1[1], result2[1]])
    table.add_column("Мах queue size", [result1[2], result2[2]])
    table.add_column("Total work time", [result1[3], result2[3]])
    print(table)

    


