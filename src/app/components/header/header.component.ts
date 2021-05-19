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
  ];

  isCurrent(path: string): boolean {
    return window.location.pathname.replace('/', '') === path;
  }
}
