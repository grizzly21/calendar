import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ql} from '@angular/core/src/render3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  createCal: FormGroup;
  month: number[][] = [];
  week: number[] = [];
  dateYear: number;
  dateMonth: number;
  dayInfoModal: any;
  modalIsActive: boolean = false;

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
    this.dateMonth = month;
    this.dateYear = year;

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

  openDay(event: MouseEvent) {
    this.modalIsActive = true;
    let day = JSON.parse(event.toElement.innerHTML);
    let selectDay = new Date(this.dateYear, this.dateMonth, day);
    let nameDay;
    switch (selectDay.getDay()) {
      case 1:
        nameDay = 'Monday';
        break;
      case 2:
        nameDay = 'Tuesday';
        break;
      case 3:
        nameDay = 'Wednesday';
        break;
      case 4:
        nameDay = 'Thursday';
        break;
      case 5:
        nameDay = 'Friday';
        break;
      case 6:
        nameDay = 'Saturday';
        break;
      case 0:
        nameDay = 'Sunday';
        break;
    }
    this.dayInfoModal = nameDay + ' ' + day + ', ' + (selectDay.getMonth() + 1) + '. ' + this.dateYear;
  }

  closeModal(){
    this.modalIsActive = false;
  }
}
