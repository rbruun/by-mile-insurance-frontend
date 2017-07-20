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

  trip = {
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
          this.trip.quoteId = this.quoteId; 
          console.log(this.quoteId);
      }
    );

  }

  addTrip(){

    let rte = Object.assign({},this.trip);
    rte.weeklyTotalMiles = rte.tripMiles * 2 * rte.frequency;
    rte.monthlyTotalMiles = Math.ceil(rte.weeklyTotalMiles * 52 / 12);

    // call the data service to add trip
    this.quoteInfoService.addRecord('addTrip', rte);
    
    // doing this way for now, will eventually call service again to get updated trip list
    //this.getTrips();
    this.trips.push(rte);
    this.calcTableTotals();

    this.trip.name = null;
    this.trip.tripMiles = null;
    this.trip.frequency = null;
  }

  getTrips() {
    this.quoteInfoService.getRecords("trip")
      .subscribe(
        trips => {this.trips = trips; this.calcTableTotals()},
        error =>  this.errorMessage = <any>error);
  }

  deleteTrip(id:number) {
        this.quoteInfoService.deleteRecord("trip", id)
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
