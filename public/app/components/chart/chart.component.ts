import { Component, OnInit, ElementRef } from '@angular/core';
import { Mayacroservice } from '../services/Mayacroservice';
import { Http } from '@angular/http';
import * as d3 from "d3";

@Component({
  selector: 'chart',
  template: require('./chart.component.html'),
  providers: [Mayacroservice]
})

export class ChartComponent {
  constructor(private element: ElementRef, private mayaService: Mayacroservice) {
  }
  title = ""; loaded = ""; total = ""; description = ""; appHub = "";
  chartCount; body; parsedData;

  svg; g; line; x; y; z; odd;

  margin = { top: 0, right: 20, bottom: 110, left: 50 };
  margin2 = { top: 180, right: 20, bottom: 20, left: 50 };

  chart1; chart2;

  width; height; height2;
  bottomView; brush; zoom; focus; x2; y2; line2; xAxis; xAxis2; yAxis; zoomAll; gridTest;

  mouseG; mousePerLine; mouse; display; rightY; horizontalY

  context; canvas; chart_size; max_size;


  parseBody(body) {
    let myData = JSON.parse(body);
    let parsedJson = []
    for(let i = 0; i < myData.length; i++) {
      let parsed = JSON.parse(myData[i]);
      let parsed2 = parsed["queries"][0]["results"]
      // console.log(parsed2);
      parsedJson.push(parsed2.slice(0,2))
    }
    return(parsedJson);
  }
  callChartsSpeed(num) {
    while (this.element.nativeElement.querySelector("svg") != null) {
      let svgSelector = this.element.nativeElement.querySelector("svg").remove();
    }
    if(this.canvas != null) {
      document.getElementById("chart").innerHTML = "";
    }
  
    for(let i = 0; i < num; i++) {
      this.eventMarkers();
      this.initChart(this.parsedData[i], String(i));
      this.noZoom(this.parsedData[i], String(i)); //no zoom
           // this.zoomFeature(this.parsedData, this.parsedData[i], String(i));
      this.crossHairsSimple(this.parsedData, this.parsedData[i], String(i));
    }
  }
  callChartsZoom(num) {
    while (this.element.nativeElement.querySelector("svg") != null) {
      let svgSelector = this.element.nativeElement.querySelector("svg").remove();
    }
    if(this.canvas != null) {
      document.getElementById("chart").innerHTML = "";
    }
    for(let i = 0; i < num; i++) {
      this.initChart(this.parsedData[0], String(i));
      // this.noZoom(this.parsedData[i], String(i)); //no zoom
      this.zoomFeature(this.parsedData, this.parsedData[0], String(i));
      // this.crossHairsSimple(this.parsedData, this.parsedData[0], String(i));
    }
  }


  clicked() {
      var loadSpeed = performance.now(); //Initial performance time
      // console.log("start", loadSpeed)

      this.mayaService.get().subscribe(
        abc => {
          this.body = abc.text();
          var loadSpeed2 = performance.now(); //after data load
          this.loaded = ("Loaded data from Microservice in " + ((loadSpeed2 - loadSpeed)/1000).toFixed(2) + " seconds.");
          // console.log("begin charting", loadSpeed2);

          this.parsedData = this.parseBody(this.body); //Parse
          this.chartCount = this.parsedData.length; //Set Number of Charts
          this.callChartsSpeed(10); //Build charts

          var speed = performance.now() + 200; //after charting, +200 constant buffering
          // console.log("end", speed);
          this.description = "10 charts loaded, 14,000 points per chart, 7000 event markers"
          this.title = ("Drew charts in " + ((speed-loadSpeed2)/1000).toFixed(2) + " seconds (includes +.2 rendering cost)"); //Display timer
          this.total = ("Total runtime = " + ((speed - loadSpeed)/1000).toFixed(2) + " seconds."); //+.2 constant buffering
          this.appHub = ("If this were in AppHub, add an additional .2 seconds");
      }
    )
    // this.getData();
  }
  clicked2() {
      var loadSpeed = performance.now();
      this.mayaService.get().subscribe(
        abc => {
          this.body = abc.text();
          var loadSpeed2 = performance.now();
          this.loaded = ("Loaded data from Microservice in " + ((loadSpeed2 - loadSpeed)/1000).toFixed(2) + " seconds.");
          this.parsedData = this.parseBody(this.body); //Parse
          this.chartCount = this.parsedData.length; //Set Number of Charts
          this.callChartsZoom(2); //Build charts

          var speed = performance.now(); //End timer
          this.description = "2 charts loaded, 14000 points per chart"
          this.title = ("Drew charts in " + ((speed-loadSpeed2)/1000).toFixed(2) + " seconds."); //Display timer
          this.total = ("Total runtime = " + ((speed - loadSpeed)/1000).toFixed(2) + " seconds.");
          this.appHub = ("If this were in AppHub, add an additional .2 seconds");
    }
    )
  }
  clicked3() {
      var loadSpeed = performance.now(); //Initial performance time

      this.mayaService.get().subscribe(
        abc => {
          this.body = abc.text();
          var loadSpeed2 = performance.now(); //after data load
          this.loaded = ("Loaded data from Microservice in " + ((loadSpeed2 - loadSpeed)/1000).toFixed(2) + " seconds.");

          this.parsedData = this.parseBody(this.body); //Parse
          this.chartCount = this.parsedData.length; //Set Number of Charts
          this.callChartsSpeed(2); //Build charts

          var speed = (performance.now() + 200); //after charting, +200 constant buffering
          this.description = "2 charts loaded, 14000 points per chart, 7000 event markers" //ADD THE .2 SECODNS CORRECTLY
          this.title = ("Drew charts in " + ((speed-loadSpeed2)/1000).toFixed(2) + " seconds (includes +.2 rendering cost)"); //Display timer
          this.total = ("Total runtime = " + ((speed - loadSpeed)/1000).toFixed(2) + " seconds."); //+.2 constant buffering
          this.appHub = ("If this were in AppHub, add an additional .2 seconds");
      }
    )
  }

  private eventMarkers(): void {
    this.canvas = d3.select("#chart").append("canvas")
      .attr("width", 1000)
      .attr("height", 11);
    this.context = this.canvas.node().getContext("2d");
    let size = this.parsedData[0][0].values.length;
    let actual_values = this.parsedData[0][0].values.map(function (d) { return ((d[0] - 1483228800000) / 60000) });
    this.max_size = actual_values[actual_values.length - 1]
    this.chart_size = new Array<number>(this.max_size);
    for (let i = 0; i < actual_values.length; i++) {
      this.chart_size[actual_values[i]] = actual_values[i]
    }
    this.context.save();
    this.context.fillStyle = "red";
    this.context.rotate(Math.PI / 4);
    for (let i = 0; i < this.chart_size.length; i++) {
      if (this.chart_size[i] != null) {
        this.context.fillRect(39 + this.chart_size[i] / (this.max_size / 614), -33 - this.chart_size[i] / (this.max_size / 614), 5, 5); // 11519/614
      }
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.beginPath();
    this.context.fillRect(58, -13, 5, 5); //30,20 = right in the corner


  }
  private initChart(data, label): void {

    this.width = 940 - this.margin.left - this.margin.right;
    this.height = 250 - this.margin.top - this.margin.bottom;
    this.height2 = 250 - this.margin2.top - this.margin2.bottom;

    // this.g = this.svg.append("g")
    //   .attr("transform", "translate(" + this.margin.left + "," + 0 + ")");
    this.x = d3.scaleTime()
      .range([0, this.width]);
    this.y = d3.scaleLinear()
      .range([this.height, 0]);
    this.x2 = d3.scaleTime()
      .range([0, this.width]);
    this.y2 = d3.scaleLinear()
      .range([this.height2, 0]);

    
    this.gridTest = d3.axisBottom(this.x);
    this.xAxis = d3.axisBottom(this.x).tickFormat(d3.timeFormat("%m/%d/%Y"));
    this.xAxis2 = d3.axisBottom(this.x2).tickFormat(d3.timeFormat("%m/%d/%Y"));
    this.yAxis = d3.axisLeft(this.y).ticks(5);

    this.z = d3.scaleOrdinal(d3.schemeCategory10);
    this.line = d3.line()
      .x((d: any) => this.x(d[0]))
      .y((d: any) => this.y(d[1]));
    this.line2 = d3.line()
      .x((d: any) => this.x2(d[0]))
      .y((d: any) => this.y2(d[1]));

    this.x.domain([
      d3.min(data, function (c) { return d3.min(c.values, function (d) { return d[0]; }); }),
      d3.max(data, function (c) { return d3.max(c.values, function (d) { return d[0]; }); })
    ]);
    this.y.domain([
      d3.min(data, function (c) { return d3.min(c.values, function (d) { return d[1]; }); }),
      d3.max(data, function (c) { return d3.max(c.values, function (d) { return d[1]; }); })
    ]);
    this.x2.domain(this.x.domain());
    this.y2.domain(this.y.domain());
    this.z.range(["#009933", "#0000FF"]);
  }

  private noZoom(data, label): void {
    this.svg = d3.select("#chart").append('svg')   
      .attr('width', 920)
      .attr('height', 200);

    this.g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + (this.height) + ")")
      .call(this.xAxis);
    this.g.append("g")
      .attr("class", "axis axis--y")
      .call(this.yAxis)
    // add the X gridlines
    this.g.append("g")
      .attr("class", "grid--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.make_x_gridlines()
        .tickSize(-this.height)
        .tickFormat("")

      )
    // add the Y gridlines
    this.g.append("g")
      .attr("class", "grid--y")
      .call(this.make_y_gridlines()
        .tickSize(-this.width)
        .tickFormat("")
      )
    let chart = this.g.selectAll(".chart")
      .data(data)
      .enter().append("g")
    chart.append("path")
      .attr("class", "line")
      .attr("d", (d) => this.line(d.values))
      .style("stroke", (d) => this.z(d.name));
  }

  private zoomFeature(allData, data, label): void {
    this.svg = d3.select("#chart").append('svg')   
      .attr('width', 920)
      .attr('height', 250);


    this.brush = d3.brushX()
      .extent([[0, 0], [this.width, this.height2]])
      .on('brush end', this.brushed.bind(this, allData));

    this.zoom = d3.zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([[0, 0], [this.width, this.height]])
      .extent([[0, 0], [this.width, this.height]])
      .on('zoom', this.zoomed.bind(this, allData));

    this.svg.append('defs').append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', this.width)
      .attr('height', this.height);

    this.focus = this.svg.selectAll(".chart")
      .data(data)
      .enter().append("g")
      .attr('class', 'focus')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.bottomView = this.svg.selectAll(".chart")
      .data(data)
      .enter().append("g")
      .attr('class', 'bottomView')
      .attr('transform', 'translate(' + this.margin2.left + ',' + this.margin2.top + ')');


    this.focus.append("g")
      .attr("class", "grid--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.make_x_gridlines()
        .tickSize(-this.height)
        .tickFormat("")
      )
    // add the Y gridlines
    this.focus.append("g")
      .attr("class", "grid--y")
      .call(this.make_y_gridlines()
        .tickSize(-this.width)
        .tickFormat("")
      )

    this.focus.append('path')
      .attr('class', 'line')
      .attr('d', (d) => this.line(d.values))
      .style("stroke", (d) => this.z(d.name));

    this.focus.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(this.xAxis);

    this.focus.append('g')
      .attr('class', 'axis axis--y')
      .call(this.yAxis);


    //bottom line
    this.bottomView.append('path')
      .data(data)
      .attr('class', 'line')
      .attr('d', (d) => this.line2(d.values))
      .style("stroke", (d) => this.z(d.name));

    this.bottomView.append('g')
      .attr('class', 'axis axiss--x')
      .attr('transform', 'translate(0,' + this.height2 + ')')
      .call(this.xAxis2);

    this.bottomView.append('g')
      .attr('class', 'brush')
      .call(this.brush)
      .call(this.brush.move, this.x.range());

    this.svg.append('rect')
      .attr('class', 'zoom')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
      .style("fill", "transparent")
      .call(this.zoom);
  }

  private brushed(allData) {
    // console.log(allData)
    let self = this;
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') return; // ignore brush-by-zoom
    let s = d3.event.selection || this.x2.range();
    this.x.domain(s.map(this.x2.invert, this.x2));
    d3.selectAll('.grid--x').call(this.make_x_gridlines()
        .tickSize(-this.height)
        .tickFormat(""))     
    d3.selectAll('.focus path.line').attr('d', (d) => this.line(d.values));
    d3.selectAll('.focus axis--x').call(this.xAxis);
    this.svg.selectAll('.zoom').call(this.zoom.transform, d3.zoomIdentity
      .scale(this.width / (s[1] - s[0]))
      .translate(-s[0], 0));
  }

  private zoomed(allData) {
    // console.log("zoomed", allData);
    let self = this;
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') return; // ignore zoom-by-brush
    let t = d3.event.transform;
    this.x.domain(t.rescaleX(this.x2).domain());
    d3.selectAll('.grid--x').call(this.make_x_gridlines()
        .tickSize(-this.height)
        .tickFormat(""))   
      d3.selectAll('.focus path.line').attr('d', function(d) {
      return self.line(d.values);
    });
    
    d3.selectAll('.axis--x').call(this.xAxis);
    d3.selectAll('.brush').call(this.brush.move, this.x.range().map(t.invertX, t));
  }
  private crossHairsSimple(allData, data, label): void {
    let self = this;

    this.mouseG = this.svg.append("g")
      .attr("class", "mouse-over-effects")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.mousePerLine = this.mouseG.selectAll('.mouse-per-line')
      .data(data)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");
    this.mousePerLine.append("circle")
      .attr("r", 4)
      .style("stroke", (d) => this.z(d.name))
      .style("fill", (d) => this.z(d.name))
      .style("stroke-width", "1px")
      .style("opacity", "0");
    this.mouseG.append("path")
      .attr("class", "mouse-line")
      .style("opacity", "0")
    this.mousePerLine.append("path")
      .attr("class", "mouse-liney")
      .style("opacity", "0");
    this.mouseG.append("rect")
      .attr("class", "display")
      .attr("width", 180)
      .attr("height", 60)
      .style("opacity", "0");

    this.mouseG.append("text")
      .attr("class", "displayText2" + label);
    this.mouseG.append("text")
      .attr("class", "displayText" + label);
    this.mouseG.append("text")
      .attr("class", "xValue");
    this.mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', this.width) // can't catch mouse events on a g element
      .attr('height', this.height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function () { // on mouse out hide line, circles and text
        d3.selectAll(".mouse-line").style("opacity", "0");
        d3.selectAll(".mouse-liney").style("opacity", "0");
        d3.selectAll(".mouse-per-line circle").style("opacity", "0");
        d3.selectAll(".xValue").style("opacity", "0");
        d3.selectAll("rect.display").style("opacity", "0");
        for(let i = 0; i < (self.chartCount); i++) {
          d3.selectAll(".displayText2" + i).style("opacity", "0");
          d3.selectAll(".displayText" + i).style("opacity", "0");
          }
      })
      .on('mouseover', function () { // on mouse in show line, circles and text
        d3.selectAll(".mouse-line").style("opacity", "1");
        d3.selectAll(".mouse-liney").style("opacity", "1");
        d3.selectAll(".mouse-per-line circle").style("opacity", "1");
        d3.selectAll(".xValue").style("opacity", "1");
        d3.selectAll("rect.display").style("opacity", "1");
        for(let i = 0; i < (self.chartCount); i++) {
          d3.selectAll(".displayText2" + i).style("opacity", "1");
          d3.selectAll(".displayText" + i).style("opacity", "1");
          }
      })
      .on('mousemove', function () { // mouse moving over canva
        let mouse = d3.mouse(this);
        let bisecting = d3.bisector(function (a) { return a[0] }).left;
        d3.selectAll(".mouse-per-line")
        //assumes the SAME TIMESTAMPS
          .attr("transform", function (d, i) {
            //https://bl.ocks.org/mbostock/3902569
            var x0 = self.x.invert(mouse[0]);
            var index = bisecting(d.values, x0);
            var d0 = d.values[index - 1]
            var d1 = d.values[index];
            var e = ((x0 - d0[0]) > (d1[0] - x0)) ? d1 : d0;
            var estimate = '';
            var actual = '';
            var x = d3.timeFormat("%H.%M.%S|%m/%d/%Y")
            var timestamp = x(e[0]);
            d3.selectAll('.xValue').text(timestamp);
            
            //2 i per chart --- one for each line
            if(i%2 == 0) { //if number is even
              estimate = e[1].toFixed(2);
              d3.selectAll('.displayText2' + i/2).text("Estimate: " + estimate);
            }
            else { //if the number is odd
              estimate = e[1].toFixed(2);
              d3.selectAll('.displayText' + (i-1)/2).text("Actual: " + estimate);
            }

            d3.selectAll(".mouse-liney")
              .attr("d", function () {
                var d = "M" + self.width + "," + 0;
                d += " " + (-self.x(e[0])) + "," + 0;
                return d;
              });
            d3.selectAll(".mouse-line")
              .attr("d", function () {
                var mouse = d3.mouse(this);
                var d = "M" + self.x(e[0]) + "," + self.height;
                d += " " + self.x(e[0]) + "," + 0;
                return d;
              });

                if(i%2 == 0) { //if number is odd
                  self.y = d3.scaleLinear()
                      .range([self.height, 0]);
                  self.y.domain([
                    d3.min(allData[i/2], function (c) { return d3.min(c.values, function (f) { return f[1]; }); }),
                    d3.max(allData[i/2], function (c) { return d3.max(c.values, function (f) { return f[1]; }); })
                    ]);
                  }
                    
              return "translate(" + self.x(e[0]) + "," + self.y(e[1]) + ")";
          });
          
        let mouse2 = d3.mouse(this); //stops it from being so finnicky
        //SWITCH WHERE THE DISPLAY IS BASED ON THE POSITION OF THE MOUSE -- EVENTUALLY IT'S ON THE LEFT SIDE AT A CERTAIN MOUSE POINT
        // console.log(mouse2[0]);
        let side = 50
        if(mouse2[0] > 640) {
          side = -220;
        }
        let top = 35
        if(mouse2[1] < 37) {
          side = -80
          top = -20
        }
        for(let i = 0; i < (self.chartCount); i++) {
          d3.selectAll(".displayText2" + i)
            .attr("transform", "translate(" + (mouse2[0] + side+20) + "," + (mouse2[1] - (top-50) + ")")
          d3.selectAll(".displayText" + i)
            .attr("transform", "translate(" + (mouse2[0] + side+20) + "," + (mouse2[1] - top + 32) + ")")
        }
        d3.selectAll(".xValue")
          .attr("transform", "translate(" + (mouse2[0] + side+20) + "," + (mouse2[1] - top + 15) + ")")
        d3.selectAll(".display")
          .attr("transform", "translate(" + (mouse2[0] + side) + "," + (mouse2[1] - top) + ")");
      });


  }

  make_x_gridlines() {
    return d3.axisBottom(this.x)
      .ticks(10)
  }
  make_y_gridlines() {
    return d3.axisLeft(this.y)
      .ticks(13)
  }
}