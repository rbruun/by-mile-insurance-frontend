import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import {DataSource} from '@angular/cdk';
import { FormControl, FormsModule, Validators } from "@angular/forms";

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


  vehicleFormControl = new FormControl('', [
  Validators.required]);

  //trips = [];
  vehicles = [];
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
    vehicle: {vehicleId: <string> null},
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
    this.getVehicles();
  }

  addTrip(){
    // call the data service to add trip
    this.quoteInfoService.addRecord('addTrip', this.trip).subscribe(
      trip => this.getTrips()
    );

    this.trip.tripName = null;
    this.trip.distance = null;
    this.trip.frequency = null;
    this.trip.vehicle.vehicleId = null;
  }

  getTrips() {
    for (let i=0; i < this.vehicles.length; i++) {
      this.quoteInfoService.getRecords("getTrips", this.vehicles[i].vehicleId)
        .subscribe(
          trips => {this.vehicles[i].trips = trips; 
                    console.log(JSON.stringify(this.vehicles[i]))
                    this.calcTableTotals(this.vehicles[i])},
          error =>  this.errorMessage = <any>error);
    }
  }

  getVehicles() {
    this.quoteInfoService.getRecords("getVehicles", this.quoteId)
        .subscribe(
          vehicles => {this.vehicles = vehicles; this.getTrips()},
          error =>  this.errorMessage = <any>error);
  }

  deleteTrip(id:number) {
        this.quoteInfoService.deleteRecord("deleteTrip", id)
          .subscribe(
            trip => {this.successMesssage = "Record(s) deleted succesfully";
                    console.log("record deleted");this.getTrips(); },
            error =>  console.log(error));
  }

  calcTableTotals(vehicle) {
    vehicle.weeklyGrandTotal = 0;
    vehicle.monthlyGrandTotal = 0;
    for (let i=0; i < vehicle.trips.length; i++) {
      vehicle.trips[i].weeklyTotalMiles = parseInt(vehicle.trips[i].distance) * 2 * parseInt(vehicle.trips[i].frequency);
      vehicle.weeklyGrandTotal += vehicle.trips[i].weeklyTotalMiles;

      vehicle.trips[i].monthlyTotalMiles = Math.ceil(parseInt(vehicle.trips[i].weeklyTotalMiles) * 52 / 12);
      vehicle.monthlyGrandTotal += vehicle.trips[i].monthlyTotalMiles;
    }
  }

  openDistanceDialog() {
    let dialogRef = this.dialog.open(DistanceapiComponent, {
      height: '400px',
      width: '500px'

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
