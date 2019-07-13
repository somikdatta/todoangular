import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ControllerService } from '../shared/controller.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  name: String = '[Enter Name]';
  greeting: String;
  hide: any;
  txt: any;
  constructor(private service: ControllerService) { }
  ngOnInit() {
    this.name = this.service.getUserName();
    this.greeting = this.service.getGreeting();
    this.hide = document.getElementById('hide');
    this.txt = document.getElementById('show');
    this.hide.innerText = this.txt.value;
    this.txt.style.width = this.hide.offsetWidth + "px";
  }
  updateName(event: any) {
    this.service.updateName(event);
    this.resize();
  }
  refreshName(event: any) {
    this.service.refreshName(event);
    this.resize();
  }
  resize() {
    this.hide.textContent = this.txt.value;
    this.txt.style.width = this.hide.offsetWidth + "px";
  }

}
