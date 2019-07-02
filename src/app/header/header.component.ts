import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../shared/controller.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name: String;
  greeting: String;
  constructor(private service: ControllerService) { }
  ngOnInit() {
    this.name = this.service.getUserName();
    this.greeting = this.service.getGreeting();
  }
  updateName(event: any) {
    this.service.updateName(event);

  }

}
