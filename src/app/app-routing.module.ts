import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Lab1PageComponent } from './pages/lab1-page/lab1-page.component';
import { Lab2PageComponent } from './pages/lab2-page/lab2-page.component';
import { Lab5PageComponent } from './pages/lab5-page/lab5-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lab1',
    pathMatch: 'full',
  },
  {
    path: 'lab1',
    component: Lab1PageComponent,
  },
  {
    path: 'lab2',
    component: Lab2PageComponent,
  },
  {
    path: 'lab5',
    component: Lab5PageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
