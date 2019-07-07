import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private height: any;
  constructor() {

    this.height = (Math.max(document.documentElement.clientHeight, window.innerHeight || 0)) / 100;
    document.getElementsByTagName('html')[0].style.fontSize = `${this.height}px`;
  }

  ngOnInit() {
  }
}
