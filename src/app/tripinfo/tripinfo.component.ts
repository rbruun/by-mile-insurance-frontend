import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { QuoteInfoService } from '../quote-info.service';

@Component({
  selector: 'app-tripinfo',
  templateUrl: './tripinfo.component.html',
  styleUrls: ['./tripinfo.component.css']
})
export class TripinfoComponent implements OnInit {

  constructor(private navRoute: ActivatedRoute,
              private quoteInfoService: QuoteInfoService) { }

  trips = [];
  weeklyTotal;
  monthlyTotal;
  quoteId;
  errorMessage: string;
  successMesssage: string;

  path = {
    quoteId: <string> null,
    name: <string> null,
    tripMiles: null,
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

  addTrip(){
    // call the data service to add trip
    this.quoteInfoService.addRecord('addTrip', this.path);

    // doing this way for now, will eventually call service again to get trip list
    let rte = Object.assign({},this.path);
    rte.weeklyTotalMiles = rte.tripMiles * 2 * rte.frequency;
    rte.monthlyTotalMiles = rte.weeklyTotalMiles * 4;
    this.trips.push(rte);

    this.calcTableTotals();
    // this.getTripss();
    this.path.name = null;
    this.path.tripMiles = null;
    this.path.frequency = null;
  }

  getTrips() {
    this.quoteInfoService.getRecords("trip")
      .subscribe(
        trips => {this.trips = trips; this.calcTableTotals()},
        error =>  this.errorMessage = <any>error);
  }

  deleteStudent(id:number) {

        this.quoteInfoService.deleteRecord("deleteTrip", id)
          .subscribe(
            student => {this.successMesssage = "Record(s) deleted succesfully"; this.getTrips(); },
            error =>  this.errorMessage = <any>error);
  }

  calcTableTotals() {
    this.weeklyTotal = 0;
    this.monthlyTotal = 0;
    for (let i=0; i < this.trips.length; i++) {
      this.weeklyTotal += this.trips[i].weeklyTotalMiles;
      this.monthlyTotal += this.trips[i].monthlyTotalMiles;
    }
  }

}
