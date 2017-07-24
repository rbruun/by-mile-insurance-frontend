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
        premium => {this.premium = premium; console.log(this.premium)},
        error =>  this.errorMessage = <any>error);
  }

}
