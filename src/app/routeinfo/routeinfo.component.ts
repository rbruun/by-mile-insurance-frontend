import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { QuoteInfoService } from '../quote-info.service';

@Component({
  selector: 'app-routeinfo',
  templateUrl: './routeinfo.component.html',
  styleUrls: ['./routeinfo.component.css']
})
export class RouteinfoComponent implements OnInit {

  constructor(private navRoute: ActivatedRoute,
              private quoteInfoService: QuoteInfoService) { }

  routes = [];
  weeklyTotal;
  monthlyTotal;
  quoteId;
  errorMessage: string;
  successMesssage: string;

  path = {
    quoteId: <string> null,
    name: <string> null,
    routeMiles: null,
    frequency: null,
    weeklyTotalMiles: null,
    monthlyTotalMiles: null
  }

  ngOnInit() {

    this.navRoute.params.subscribe(
      (params : Params) => {
          this.quoteId = params["quoteId"];
          this.path.quoteId = this.quoteId; 
          console.log(this.quoteId);
      }
    );

  }

  addRoute(){
    // call the data service to add route
    this.quoteInfoService.addRecord('addRoute', this.path);

    // doing this way for now, will eventually call service again to get route list
    let rte = Object.assign({},this.path);
    rte.weeklyTotalMiles = rte.routeMiles * 2 * rte.frequency;
    rte.monthlyTotalMiles = rte.weeklyTotalMiles * 4;
    this.routes.push(rte);

    this.calcTableTotals();
    // this.getRoutes();
    this.path.name = null;
    this.path.routeMiles = null;
    this.path.frequency = null;
  }

  getRoutes() {
    this.quoteInfoService.getRecords("route")
      .subscribe(
        routes => {this.routes = routes; this.calcTableTotals()},
        error =>  this.errorMessage = <any>error);
  }

  deleteStudent(id:number) {

        this.quoteInfoService.deleteRecord("deleteRoute", id)
          .subscribe(
            student => {this.successMesssage = "Record(s) deleted succesfully"; this.getRoutes(); },
            error =>  this.errorMessage = <any>error);
  }

  calcTableTotals() {
    this.weeklyTotal = 0;
    this.monthlyTotal = 0;
    for (let i=0; i < this.routes.length; i++) {
      this.weeklyTotal += this.routes[i].weeklyTotalMiles;
      this.monthlyTotal += this.routes[i].monthlyTotalMiles;
    }
  }

}
