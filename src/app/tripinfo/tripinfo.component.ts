import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import {DataSource} from '@angular/cdk';

import { QuoteInfoService } from '../quote-info.service';
import { DistanceapiComponent } from './distanceapi.component';

@Component({
  selector: 'app-tripinfo',
  templateUrl: './tripinfo.component.html',
  styleUrls: ['./tripinfo.component.css']
})
export class TripinfoComponent implements OnInit {

  constructor(private navRoute: ActivatedRoute,
              private quoteInfoService: QuoteInfoService,
              public dialog: MdDialog,
              private router: Router) { }

  trips = [];
  tripsTotal = {
    quote: {quoteId: <string> null},
    totalMiles: <number> null
  }

  weeklyGrandTotal;
  monthlyGrandTotal;
  quoteId;
  errorMessage: string;
  successMesssage: string;

  trip = {
    quote: {quoteId: <string> null},
    tripName: <string> null,
    distance: null,
    frequency: null
  }

  ngOnInit() {

    this.navRoute.params.subscribe(
      (params : Params) => {
          this.quoteId = params["quoteId"];
          this.trip.quote.quoteId = this.quoteId;
          console.log(this.quoteId);
      }
    );
    this.getTrips();
  }

  addTrip(){
    // call the data service to add trip
    this.quoteInfoService.addRecord('addTrip', this.trip).subscribe(
      trip => this.getTrips()
    );

    this.trip.tripName = null;
    this.trip.distance = null;
    this.trip.frequency = null;
  }

  getTrips() {
console.log("getTrips");
    this.quoteInfoService.getRecords("getTrips", this.quoteId)
      .subscribe(
        trips => {this.trips = trips; this.calcTableTotals()},
        error =>  this.errorMessage = <any>error);
  }

  deleteTrip(id:number) {
        this.quoteInfoService.deleteRecord("deleteTrip", id)
          .subscribe(
            trip => {this.successMesssage = "Record(s) deleted succesfully";
                    console.log("record deleted");this.getTrips(); },
            error =>  console.log(error));
  }

  calcTableTotals() {
    this.weeklyGrandTotal = 0;
    this.monthlyGrandTotal = 0;
    for (let i=0; i < this.trips.length; i++) {
      this.trips[i].weeklyTotalMiles = parseInt(this.trips[i].distance) * 2 * parseInt(this.trips[i].frequency);
      this.weeklyGrandTotal += this.trips[i].weeklyTotalMiles;

      this.trips[i].monthlyTotalMiles = Math.ceil(parseInt(this.trips[i].weeklyTotalMiles) * 52 / 12);
      this.monthlyGrandTotal += this.trips[i].monthlyTotalMiles;
    }
  }

  openDistanceDialog() {
    let dialogRef = this.dialog.open(DistanceapiComponent, {
      height: '320px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.trip.distance = result;
    });
  }

  goToSummary() {
    this.tripsTotal.quote.quoteId = this.quoteId;
    this.tripsTotal.totalMiles = this.monthlyGrandTotal;
    // call the data service to add trip totals
    this.quoteInfoService.addRecord('addTotalTrip', this.tripsTotal).subscribe();

    // route to the summary page
    this.router.navigate(['summary', this.quoteId]);
  }

}
