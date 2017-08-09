import {Component, ElementRef, Renderer, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {ChartComponent} from "../chart/chart.component";


/**
 * Component to display asset details in a json editor.
 */
@Component({
  selector: 'panel',
  template: require('./panel.component.html')

})
export class PanelComponent {

  constructor(private element: ElementRef, private renderer: Renderer) {
  }
}
