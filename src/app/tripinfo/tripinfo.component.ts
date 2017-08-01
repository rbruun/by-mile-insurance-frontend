import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import {DataSource} from '@angular/cdk';
import { FormControl, NgForm, FormsModule, Validators } from "@angular/forms";
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

import { QuoteInfoService } from '../quote-info.service';
import { DistanceapiComponent } from './distanceapi.component';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-tripinfo',
  templateUrl: './tripinfo.component.html',
  styleUrls: ['./tripinfo.component.css']
})
export class TripinfoComponent implements OnInit {

  constructor(private navRoute: ActivatedRoute,
              private quoteInfoService: QuoteInfoService,
              public dialog: MdDialog,
              private router: Router,
              private navigationService: NavigationService
            ) { }

  tripinfoForm: NgForm;
  @ViewChild('tripinfoForm') currentForm: NgForm;

  vehicles = [];
  tripsTotal = {
    vehicleId: <string> null,
    totalMiles: <number> null
  }

  showTable = false;
  tripsPresent;
  updateVehicle = false;
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
    this.announce();
  }

  addTrip(){
    // call the data service to add trip
    this.quoteInfoService.addRecord('addTrip', this.trip).subscribe(
      trip => this.getTrips(true)
    );

    this.trip.tripName = null;
    this.trip.distance = null;
    this.trip.frequency = null;
    this.trip.vehicle.vehicleId = null;

    this.tripinfoForm.resetForm();
  }

  getTrips(update) {
    this.tripsPresent = false;
    for (let i=0; i < this.vehicles.length; i++) {
      this.quoteInfoService.getRecords("getTrips", this.vehicles[i].vehicleId)
        .subscribe(
          trips => {this.vehicles[i].trips = trips; 
                    this.calcTableTotals(this.vehicles[i], update);
                        if (this.tripsPresent) {
                          this.showTable = true;
                        } else {
                          this.showTable = false;
                        }
                      },
          error =>  this.errorMessage = <any>error);     
    } 
  }

  getVehicles() {
    this.quoteInfoService.getRecords("getVehicles", this.quoteId)
        .subscribe(
          vehicles => {this.vehicles = vehicles; this.getTrips(false)},
          error =>  this.errorMessage = <any>error);
  }

  deleteTrip(id:number) {
        this.quoteInfoService.deleteRecord("deleteTrip", id)
          .subscribe(
            trip => {this.successMesssage = "Record(s) deleted succesfully";
                    this.getTrips(true); },
            error =>  console.log(error));
  }

  calcTableTotals(vehicle, update) {    
    vehicle.weeklyGrandTotal = 0;
    vehicle.monthlyGrandTotal = 0;
    vehicle.totalTrip = 0;
    for (let i=0; i < vehicle.trips.length; i++) {
      this.tripsPresent = true;
      vehicle.trips[i].weeklyTotalMiles = parseInt(vehicle.trips[i].distance) * 2 * parseInt(vehicle.trips[i].frequency);
      vehicle.weeklyGrandTotal += vehicle.trips[i].weeklyTotalMiles;

      vehicle.trips[i].monthlyTotalMiles = Math.ceil(parseInt(vehicle.trips[i].weeklyTotalMiles) * 52 / 12);
      vehicle.totalTrip += vehicle.trips[i].monthlyTotalMiles;
    }
    if (update) {
      this.tripsTotal.vehicleId = vehicle.vehicleId;
      this.tripsTotal.totalMiles = vehicle.totalTrip;          
      this.quoteInfoService.editRecord("addTotalMiles", this.tripsTotal).subscribe();
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
    this.router.navigate(['summary', this.quoteId])
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.tripinfoForm = this.currentForm;
    this.tripinfoForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.tripinfoForm.form;
  }

  announce () {
    this.navigationService.announceTrip();
  }
}
