import { Component, OnInit, NgZone } from '@angular/core';
import { ControllerService } from '../shared/controller.service';

import { Qod } from '../shared/model';
import { Weather } from '../shared/model';
import { Address } from '../shared/model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private quote: Qod;
  private quoteStr: string;
  private quoteAuthor: string;
  private time: number;
  private color: string = '#b1bfc9';
  private latitude: any;
  private longitude: any;
  private weatherReportReady: boolean;
  private weatherReport: Weather;
  private address: Address;
  private temperature: number;
  private timezone: string;
  private summary: string;
  private weatherIcon: string;
  private locationAvailability: boolean;

  constructor(private service: ControllerService, private ngZone: NgZone) { }

  ngOnInit() {

    this.service.getQuote().subscribe(
      qod => {
        this.quote = qod,
          this.quoteStr = this.quote.contents.quotes[0].quote,
          this.quoteAuthor = this.quote.contents.quotes[0].author,
          err => console.log(err)
      });
    this.timeNow();

    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.latitude = position.coords.latitude,
            this.longitude = position.coords.longitude,
            this.locationAvailability = true,
            this.service.getWeather(`${this.latitude},${this.longitude}`).subscribe(
              weatherReport => {
                this.weatherReport = weatherReport,
                  this.temperature = this.weatherReport.currently.temperature,
                  this.temperature = Math.floor((this.temperature - 32) / 1.8),
                  this.summary = this.weatherReport.currently.summary,
                  this.weatherIcon = `${this.weatherReport.currently.icon}.png`,
                  this.weatherReportReady = true;
              },
              err => console.log(err)
            );
          this.service.getLocation(this.latitude, this.longitude).subscribe(
            address => {
              this.address = address,
                this.timezone = this.address.address.city
            },
            err => console.log(err)
          );
        },
        error => {
          this.locationAvailability = false;
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

