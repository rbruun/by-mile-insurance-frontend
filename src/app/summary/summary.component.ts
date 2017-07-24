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
  premium;
  totalMonthlyMiles;
  monthlyByMileCost;
  totalMonthlyByMileCost;
  monthlySavings;
  annualSavings;

  ngOnInit() {

    this.navRoute.params.subscribe(
      (params : Params) => {
          this.quoteId = params["quoteId"];
          console.log(this.quoteId);
      }
    );

    this.getPremium();

  }

  getPremium() {
    this.quoteInfoService.getRecords("getPremium", this.quoteId)
      .subscribe(
        premium => {this.premium = premium; this.getMileTotal()},
        error =>  this.errorMessage = <any>error);
  }

  getMileTotal() {
    this.quoteInfoService.getRecord("getTotalTrip", this.quoteId)
      .subscribe(
        total => {this.totalMonthlyMiles = total.totalMiles; this.calcTotals()},
        error =>  this.errorMessage = <any>error);

  }

  calcTotals() {
      this.monthlyByMileCost = (this.totalMonthlyMiles * this.premium.byMileRate).toFixed(2);
      this.totalMonthlyByMileCost = (parseFloat(this.premium.monthlyByMileBasePremium) + parseFloat(this.monthlyByMileCost)).toFixed(2);
      this.monthlySavings = (this.premium.monthlyPremium - this.totalMonthlyByMileCost).toFixed(2);
      this.annualSavings = (this.monthlySavings * 12).toFixed(2);
  }

}
