import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { RoutingModule } from './routing/routing.module';
import { ControllerService } from './shared/controller.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
  ],
  providers: [ControllerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
