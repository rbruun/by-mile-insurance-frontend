import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { QuoteInfoService } from '../quote-info.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(private navRoute: ActivatedRoute,
              private quoteInfoService: QuoteInfoService,
              private router: Router) { }

  quoteId;
  errorMessage;
  // premium;
  // totalMonthlyMiles;
  // monthlyByMileCost;
  totalMonthlyByMileCost = 0;
  annualByMileCost = 0;
  traditionalMonthlyCost = 0;
  traditionalAnnualCost = 0;
  // monthlySavings;
  // annualSavings;

  drivers;
  premiums;

  ngOnInit() {

    this.navRoute.params.subscribe(
      (params : Params) => {
          this.quoteId = params["quoteId"];
      }
    );
    this.getDrivers();
    this.getPremium();

  }

  getPremium() {
    this.quoteInfoService.getRecords("getPremium", this.quoteId)
      .subscribe(
        premium => {this.premiums = premium; this.calcTotals()},
        error =>  this.errorMessage = <any>error);
  }

  // getMileTotal() {
  //   this.quoteInfoService.getRecord("getTotalTrip", this.quoteId)
  //     .subscribe(
  //       total => {this.totalMonthlyMiles = total.totalMiles; this.calcTotals()},
  //       error =>  this.errorMessage = <any>error);

  // }

  getDrivers(){
      this.quoteInfoService.getRecords("getDrivers", this.quoteId)
      .subscribe(
        drivers => {this.drivers = drivers;},
        error =>  this.errorMessage = <any>error);
  }

  calcTotals() {
    for (let i=0; i < this.premiums.length; i++) {
      this.totalMonthlyByMileCost += this.premiums[i].monthlyByMileBasePremium; 
      this.totalMonthlyByMileCost += (this.premiums[i].byMileRate * this.premiums[i].vehicle.totalMiles);
      this.traditionalMonthlyCost += this.premiums[i].monthlyPremium;
      this.traditionalAnnualCost += this.premiums[i].premium;
      this.annualByMileCost += this.premiums[i].byMileBasePremium;
      this.annualByMileCost += (this.premiums[i].byMileRate * this.premiums[i].vehicle.totalMiles * 12)
    }
  }

}
