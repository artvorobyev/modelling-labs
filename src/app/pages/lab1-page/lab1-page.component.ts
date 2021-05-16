import { Component, OnInit } from '@angular/core';
import { TABLE } from './const';
const xorshift = require('xorshift');

@Component({
  selector: 'app-lab1-page',
  templateUrl: './lab1-page.component.html',
  styleUrls: ['./lab1-page.component.scss'],
})
export class Lab1PageComponent implements OnInit {
  algorythmicLength: number = 0;
  algorythmicLengthArray: void[] = [];
  algorythmicData: number[][] = [];

  tableLength: number = 0;
  tableLengthArray: void[] = [];
  tableData: number[][] = [];

  userString: string = '';
  userData: number[] = [];

  ngOnInit(): void {}

  generateAlgorythmicData(length: number, min: number, max: number): number[] {
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(this.getAlgorythmicRand(min, max));
    }
    return arr;
  }

  submitAlgorythmicData(event: Event): void {
    event.preventDefault();
    this.algorythmicLengthArray = Array(this.algorythmicLength);
    this.algorythmicData[0] = this.generateAlgorythmicData(
      this.algorythmicLength,
      0,
      10
    );

    this.algorythmicData[1] = this.generateAlgorythmicData(
      this.algorythmicLength,
      9,
      100
    );

    this.algorythmicData[2] = this.generateAlgorythmicData(
      this.algorythmicLength,
      99,
      1000
    );
  }

  getCorrelation(arr: number[]): string {
    let u = arr[0];
    let u2 = arr[0] * arr[0];
    let uv = 0;
    let last = arr[0];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      u += arr[i];
      u2 += arr[i] * arr[i];
      uv += arr[i] * last;
      last = arr[i];
    }
    uv += arr[n - 1] * arr[0];

    const C = (n * uv - u * u) / (n * u2 - u * u);

    return C.toFixed(4);
  }

  submitTableData(event: Event): void {
    event.preventDefault();
    this.tableLengthArray = Array(this.tableLength);
    this.tableData[0] = this.getTableData(this.tableLength, 10, 0);
    this.tableData[1] = this.getTableData(this.tableLength, 100, 1);
    this.tableData[2] = this.getTableData(this.tableLength, 1000, 2);
  }

  submitUserData(event: Event): void {
    event.preventDefault();
    this.userData = this.userString.split(' ').map((item) => Number(item));
  }

  isUserFieldValid(): boolean {
    return !this.userString.search(/\d/g);
  }

  private getAlgorythmicRand(min: number, max: number): number {
    return Math.round(min + xorshift.random() * (max - min));
  }

  private getTableData(length: number, max: number, time: number): number[] {
    let arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(TABLE[i + length * time] % max);
    }
    return arr;
  }
}
