import { getRandomInt } from './helpers';

export class Operator {
  timeForOperationMin: number;
  timeForOperationMax: number;
  nextFreeTime: number;
  name: string;
  computer: Computer;

  constructor(
    timeForOperation: number,
    timeGap: number,
    name: string,
    computer: Computer
  ) {
    this.timeForOperationMin = timeForOperation - timeGap;
    this.timeForOperationMax = timeForOperation + timeGap;
    this.nextFreeTime = 0;
    this.name = name;
    this.computer = computer;
  }

  isFree(currentTime: number): boolean {
    return this.nextFreeTime <= currentTime;
  }

  setClient(currentTime: number): void {
    if (!this.isFree(currentTime)) {
      throw Error(`${this.name} is busy`);
    }
    this.nextFreeTime =
      currentTime +
      getRandomInt(this.timeForOperationMin, this.timeForOperationMax);
  }
}

export class Computer {
  timeForOperation: number;
  name: string;
  nextFreeTime: number;
  queue: number;

  constructor(timeForOperation: number, name: string) {
    this.timeForOperation = timeForOperation;
    this.nextFreeTime = 0;
    this.name = name;
    this.queue = 0;
  }

  isFree(currentTime: number): boolean {
    return this.nextFreeTime <= currentTime;
  }

  addClient(currentTime: number): void {
    if (!this.isFree(currentTime)) {
      this.queue++;
      return;
    }

    if (this.queue) {
      this.getClientFromQueue(currentTime);
      this.queue++;
      return;
    }

    this.nextFreeTime = currentTime + this.timeForOperation;
  }

  check(currentTime: number): void {
    if (this.isFree(currentTime) && this.queue) {
      this.getClientFromQueue(currentTime);
    }
  }

  getClientFromQueue(currentTime: number) {
    this.queue--;
    this.nextFreeTime = currentTime + this.timeForOperation;
  }
}
