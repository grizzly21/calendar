import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ql} from '@angular/core/src/render3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  createCal: FormGroup;
  month: number[][] = [];
  week: number[] = [];

  constructor() {
    this.createCal = new FormGroup({
      'year': new FormControl('', Validators.required),
      'month': new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.createCal.controls;
  }

  createCalendar() {
    this.month = [];
    this.week = [];
    let year = this.f.year.value;
    let month = this.f.month.value - 1;
    let date = new Date(year, month);

    for (let i = 0; i < this.getDay(date); i++) {
      this.week.push(null);
    }

    while (date.getMonth() === month) {
      this.week.push(date.getDate());

      if (this.getDay(date) % 7 === 6) {
        this.month.push(this.week);
        this.week = [];
      }
      date.setDate(date.getDate() + 1);

    }

    if (this.getDay(date) != 0) {
      for (let i = this.getDay(date); i < 7; i++) {
        this.week.push(null);
      }
      this.month.push(this.week);
    }
    console.log(this.month);
  }

  getDay(date): number {
    let day = date.getDay();
    if (day == 0) {
      day = 7;
    }
    return day - 1;
  }

}
