import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Lab1PageComponent } from './pages/lab1-page/lab1-page.component';
import { Lab2PageComponent } from './pages/lab2-page/lab2-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';
import { Lab5PageComponent } from './pages/lab5-page/lab5-page.component';

@NgModule({
  declarations: [
    AppComponent,
    Lab1PageComponent,
    Lab2PageComponent,
    Lab5PageComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
