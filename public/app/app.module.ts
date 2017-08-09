//header file, essentially

import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {TreeModule} from 'angular2-tree-component';

import {AppComponent}  from './base-app.component';
import {AppRoutingModule} from './app-routing.module';

import {ChartComponent} from './components/chart/chart.component';
import {PanelComponent} from './components/panel/panel.component';

@NgModule({
    //angular stuff
  imports:      [
      BrowserModule,
      TreeModule,
      AppRoutingModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule
  ],
  //my own
  declarations: [
      AppComponent,
      ChartComponent,
      PanelComponent
  ],
  providers: [],
  bootstrap:    [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
