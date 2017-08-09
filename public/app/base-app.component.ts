import {Component, ViewChild, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ChartComponent} from "./components/chart/chart.component";
@Component({
    selector: 'base-app',
    template: require('./base-app.component.html'),
    providers: []
})
export class AppComponent implements OnInit {
  isLocatingAnalytic: boolean = true;
  errorLocatingAnalytic: boolean = false;
  isNonCloudAnalyticSelected: boolean = false;
  isReady: boolean = false;
  successfullyLoadedAnalyticForAdvisory: boolean = false;
  assetID: string = "";
  latestParams: Params;

  title: string = "Loading";
  message: string = 'Initializing...'; // TODO: i18n


  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // Wire to route changes, so that we can select the desired analytic asset
    // this.route.queryParams.subscribe(parameters => this.handleRouteChange(parameters));
  }



}
