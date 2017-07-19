import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { QuoteInfoService } from '../quote-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private quoteId: string;
  private errorMessage: string;

  constructor( 
    private quoteInfoService: QuoteInfoService,
    private router: Router) { }

  ngOnInit() {
  }

  getQuoteId(){
  // call api to get a quote key then route to driver page
      this.quoteInfoService.addRecord('addQuote', {})
      .subscribe(
        quote => {this.quoteId = quote.quoteId;
                  this.router.navigate(['driverinfo', this.quoteId]);},
        error =>  this.errorMessage = <any>error);

  }

}
