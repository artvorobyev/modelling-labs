import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  pages = [
    {
      title: 'Лабораторная работа №1',
      path: 'lab1',
    },
    {
      title: 'Лабораторная работа №2',
      path: 'lab2',
    },
    {
      title: 'Лабораторная работа №5',
      path: 'lab5',
    },
  ];

  isCurrent(path: string): boolean {
    return window.location.pathname.replace('/', '') === path;
  }
}
