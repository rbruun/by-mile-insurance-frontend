import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import { FormControl, FormsModule, Validators } from "@angular/forms";

import { VehInfoService } from '../veh-info.service'
import { QuoteInfoService } from '../quote-info.service';

@Component({
  selector: 'app-vehinfo',
  templateUrl: './vehinfo.component.html',
  styleUrls: ['./vehinfo.component.css']
})
export class VehinfoComponent implements OnInit {
    // this is the earliest year where information is available
    minYear: number;
    // this is the last model year where information is available
    maxYear: number;

    quoteId: string;
    yearsList = new Array();
    errorMessage: string;
    makes: any[];
    models: any[];
    trims: any[];
    drivers: any[];

    vehicle = {
      quote: {quoteId: <string> null},
      modelYear: <string> null,
      vehicleMakeRatingFactor: {make: <string> null},
      model: <string> null,
      trim: <string> null,
      antiTheft: <string> null,
      ownLease: <string> null,
      driver: {driverId: <string> null}
    }


    driverFormControl = new FormControl('', [
    Validators.required]);

    constructor(
    private dataService: VehInfoService,
    private quoteInfoService: QuoteInfoService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  getValidYears(years) {
    console.log(years);
    this.minYear = years.Years.min_year;
    this.maxYear = years.Years.max_year;
    for (let i=this.maxYear; i >= this.minYear; i--) {
      this.yearsList.push(i);
    }
  }

  getValidMakes() {
    this.makes = null;
    this.vehicle.vehicleMakeRatingFactor.make = null;
    this.models = null;
    this.vehicle.model = null;
    this.trims = null;
    this.vehicle.trim = null;
    this.vehicle.antiTheft = null;
    this.vehicle.ownLease = null;
    console.log(this.vehicle.modelYear)
    this.dataService.getMakes(this.vehicle.modelYear)
      .subscribe(
        makes => this.makes = makes.Makes,
        error =>  this.errorMessage = <any>error);
  }

    getValidModels() {
    this.models = null;
    this.vehicle.model = null;
    this.trims = null;
    this.vehicle.trim = null;    
    this.vehicle.antiTheft = null;
    this.vehicle.ownLease = null;
    console.log(this.vehicle.vehicleMakeRatingFactor.make)
    this.dataService.getModels(this.vehicle.modelYear, this.vehicle.vehicleMakeRatingFactor.make)
      .subscribe(
        models => this.models = models.Models,
        error =>  this.errorMessage = <any>error);
  }

    getValidTrims() {
    this.trims = null;
    this.vehicle.trim = null;
    this.vehicle.antiTheft = null;
    this.vehicle.ownLease = null;
    this.dataService.getTrimLevels(this.vehicle.modelYear, this.vehicle.vehicleMakeRatingFactor.make, this.vehicle.model)
      .subscribe(
        trims => this.trims = trims.Trims,
        error => this.errorMessage = <any>error);
  }

    saveVehicle(){
      // call api service to save vehicle
      this.quoteInfoService.addRecord('addVehicle', this.vehicle).subscribe();
      this.router.navigate(['tripinfo', this.quoteId]);
    }

  ngOnInit() {

    this.route.params.subscribe(
      (params : Params) => {
          this.quoteId = params["quoteId"];
          this.vehicle.quote.quoteId = this.quoteId;
          console.log(this.quoteId);
      })

      this.dataService.getAvailableYears()
        .subscribe(
          years => this.getValidYears(years),
          error =>  this.errorMessage = <any>error);

      this.quoteInfoService.getRecords("getDrivers", this.quoteId)
        .subscribe(
          drivers => {this.drivers = drivers; console.log(this.drivers)},
          error =>  this.errorMessage = <any>error);
  }    

}
