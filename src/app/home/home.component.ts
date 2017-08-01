import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { QuoteInfoService } from '../quote-info.service';
import { NavigationService } from '../navigation.service';

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
    private router: Router,
    private navigationService: NavigationService) { }

  ngOnInit() {   
    this.announce();
  }

  getQuoteId(){
  // call api to get a quote key then route to driver page
      this.quoteInfoService.addRecord('addQuote', {})
      .subscribe(

        quote => {this.quoteId = quote.quoteId;
                  this.router.navigate(['driverinfo', this.quoteId]);
                  sessionStorage.setItem('quoteId', this.quoteId);},
        error =>  this.errorMessage = <any>error);

  }

  announce() {  
    this.navigationService.announceHome();
  }
}
