import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private height: any;
  constructor(updates: SwUpdate) {
    this.height = (Math.max(document.documentElement.clientHeight, window.innerHeight || 0)) / 100;
    document.getElementsByTagName('html')[0].style.fontSize = `${this.height}px`;

    updates.available.subscribe(
      e => {
        updates.activateUpdate().then(() => document.location.reload());
      }
    );
  }

  ngOnInit() {
  }
}
