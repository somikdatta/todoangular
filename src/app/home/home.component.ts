import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../shared/controller.service';
import { SkyconsTypes } from 'ngx-skycons';

import { Qod } from '../shared/model';
import { Weather } from '../shared/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private quote: Qod;
  private time: number;
  private color: string;
  private latitude: any;
  private longitude: any;
  private weatherReport: Weather;
  private temperature: number;
  private timezone: string;
  private summary: string;
  private weatherIcon: string;
  constructor(private service: ControllerService) {
  }

  ngOnInit() {
    this.service.getQuote().subscribe(
      qod => this.quote = qod,
      err => alert('Error')
    );
    this.timeNow();

    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.latitude = position.coords.latitude,
            this.longitude = position.coords.longitude,
            this.service.getWeather(`${this.latitude},${this.longitude}`).subscribe(
              weatherReport => {
                this.weatherReport = weatherReport,
                  this.temperature = this.weatherReport.currently.temperature,
                  this.temperature = Math.floor((this.temperature - 32) / 1.8),
                  this.timezone = this.weatherReport.timezone,
                  this.summary = this.weatherReport.currently.summary,
                  this.weatherIcon = this.weatherReport.currently.icon
              },
              err => console.log(err)
            );
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    };


  }

  timeNow(): void {
    this.time = Date.now();
    setInterval(() => {
      this.timeNow();
    }, 60000);
  }


}
