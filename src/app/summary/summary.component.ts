import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { QuoteInfoService } from '../quote-info.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(private navRoute: ActivatedRoute,
              private quoteInfoService: QuoteInfoService,
              private router: Router,
              private navigationService: NavigationService
            ) { }

  quoteId;
  errorMessage;
  totalMonthlyByMileCost = 0;
  annualByMileCost = 0;
  traditionalMonthlyCost = 0;
  traditionalAnnualCost = 0;

  drivers;
  premiums;

  ngOnInit() {

    this.quoteId = sessionStorage.getItem('quoteId');
    this.getDrivers();
    this.getPremium();
    this.announce();
  }

  getPremium() {
    this.quoteInfoService.getRecords("getPremium", this.quoteId)
      .subscribe(
        premium => {this.premiums = premium; this.calcTotals()},
        error =>  this.errorMessage = <any>error);
  }

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

  announce () {
    this.navigationService.announceSummary();
  }
}
