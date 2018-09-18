import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  createCal: FormGroup;

  constructor(){
    this.createCal = new FormGroup({
      'year': new FormControl('', Validators.required),
      'month': new FormControl('', Validators.required)
    });
  }

  get f() { return this.createCal.controls; }
  createCalendar() {
    let year = this.f.year.value;
    let month = this.f.month.value;
  }
}
