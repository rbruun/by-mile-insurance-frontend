import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { VehInfoService } from '../veh-info.service'

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

    yearsList = new Array();
    errorMessage: string;
    modelYear: string;
    makes: any[];
    make: string;
    models: any[];
    model: string;
    trims: any[];
    trim: string;

    constructor(
    private dataService: VehInfoService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  getValidYears(years) {
    console.log(years);
    this.minYear = years.Years.min_year;
    this.maxYear = years.Years.max_year;
    for (let i=this.maxYear; i >= this.minYear; i--) {
      this.yearsList.push(i);
    }
  }

  extractMakes(makes) {
    this.makes = makes.Makes;
  }

  extractModels(models) {
    this.models = models.Models;
  }

  extractTrims(trims) {
    console.log(trims);
    this.trims = trims.Trims;
  }

  getValidMakes() {
    this.makes = null;
    this.make = null;
    this.models = null;
    this.model = null;
    this.trims = null;
    this.trim = null;    
    this.dataService.getMakes(this.modelYear)
      .subscribe(
        makes => this.extractMakes(makes),
        error =>  this.errorMessage = <any>error);
  }

    getValidModels() {
    this.models = null;
    this.model = null;
    this.trims = null;
    this.trim = null;    
    this.dataService.getModels(this.modelYear, this.make)
      .subscribe(
        models => this.extractModels(models),
        error =>  this.errorMessage = <any>error);
  }

    getValidTrims() {
    this.trims = null;
    this.trim = null;
    this.dataService.getTrimLevels(this.modelYear, this.make, this.model)
      .subscribe(
        trims => this.extractTrims(trims),
        error =>  this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.dataService.getAvailableYears()
      .subscribe(
        years => this.getValidYears(years),
        error =>  this.errorMessage = <any>error);
  }


}
