import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Qod } from './model';
import { Weather } from './model';
import { Address } from './model';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  private quoteAPIURL = 'http://quotes.rest/qod.json';
  private weatherAPIURL = 'http://corsproxysomik.herokuapp.com/https://api.darksky.net/forecast/44d5f2c1fe93d1fe500407f32b6fe528/';
  private locationAPIURL = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&';

  constructor(private http: HttpClient) { }
  getUserName(): String {
    return localStorage.getItem('name') ? localStorage.getItem('name') : 'User';
  }

  updateName(event: any) {
    if (event.type === 'keydown') {
      if (event.which == 13) {
        localStorage.setItem('name', event.target.innerText);
        event.target.blur();
      }
    }
    else {
      localStorage.setItem('name', event.target.innerText);
    }
  }

  getGreeting(): String {
    let today = new Date();
    let hour = today.getHours();
    if (hour < 12)
      return 'Good Morning, ';
    else if (hour < 17)
      return 'Good Afternoon, ';
    else if (hour < 21)
      return 'Good Evening, ';
    else
      return 'Good Night, ';
  }

  getQuote(): Observable<Qod> {
    return this.http.get<Qod>(this.quoteAPIURL);
  }

  getWeather(location: string): Observable<Weather> {
    return this.http.get<Weather>(`${this.weatherAPIURL}${location}?exclude=minutely,hourly,daily`);
  }

  getLocation(lat: number, lng: number): Observable<Address> {
    return this.http.get<Address>(`${this.locationAPIURL}lat=${lat}&lon=${lng}`);
  }

}
