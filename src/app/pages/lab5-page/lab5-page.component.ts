import { Component, OnInit } from '@angular/core';
import { getRandomInt } from './helpers';
import { Computer, Operator } from './models';

@Component({
  selector: 'app-lab5-page',
  templateUrl: './lab5-page.component.html',
  styleUrls: ['./lab5-page.component.scss'],
})
export class Lab5PageComponent implements OnInit {
  requestsCount = 300;
  requestsPeriod = 10;
  requestsPeriodGap = 2;

  operator1Period = 20;
  operator1PeriodGap = 5;
  operator2Period = 40;
  operator2PeriodGap = 10;
  operator3Period = 40;
  operator3PeriodGap = 20;

  computer1Period = 15;
  computer2Period = 30;

  showResults = false;
  fails = 0;
  failProbability = 0;

  ngOnInit(): void {}

  submitData(event: Event): void {
    event.preventDefault();
    this.fails = this.calculateModel();
    this.failProbability = this.fails / this.requestsCount;
    this.showResults = true;
  }

  calculateModel(): number {
    const REQUEST_COUNT = this.requestsCount;
    const REQUEST_PERIOD = this.requestsPeriod;
    const REQUEST_PERIOD_GAP = this.requestsPeriodGap;

    let timer = 0;
    let requestsTimer = 0;
    let requestCounter = REQUEST_COUNT;
    let fails = 0;

    const COMPUTER1 = new Computer(this.computer1Period, 'Comp 1');
    const COMPUTER2 = new Computer(this.computer2Period, 'Comp 2');

    const OPERATOR1 = new Operator(
      this.operator1Period,
      this.operator1PeriodGap,
      'Operator 1',
      COMPUTER1
    );
    const OPERATOR2 = new Operator(
      this.operator2Period,
      this.operator2PeriodGap,
      'Operator 2',
      COMPUTER1
    );
    const OPERATOR3 = new Operator(
      this.operator3Period,
      this.operator3PeriodGap,
      'Operator 3',
      COMPUTER2
    );

    const OPERATORS = [OPERATOR1, OPERATOR2, OPERATOR3];

    while (requestCounter > 0) {
      [COMPUTER1, COMPUTER2].forEach((computer) => computer.check(timer));

      if (timer == requestsTimer) {
        const finder = OPERATORS.find((operator) => operator.isFree(timer));
        if (!finder) {
          fails++;
        } else {
          finder.setClient(timer);
          finder.computer.addClient(timer);
        }

        requestCounter--;
        requestsTimer += getRandomInt(
          REQUEST_PERIOD - REQUEST_PERIOD_GAP,
          REQUEST_PERIOD + REQUEST_PERIOD_GAP
        );
      }

      timer++;
    }

    return fails;
  }
}
