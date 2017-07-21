

import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

import { QuoteInfoService } from '../quote-info.service';

@Component({
  selector: 'app-driverinfo',
  templateUrl: './driverinfo.component.html',
  styleUrls: ['./driverinfo.component.css']
})

export class DriverinfoComponent implements OnInit {

  quoteId: string;

  driver =
  {
    quote: {quoteId: <string>null},
    firstName: <string>null,
    last_name: <string>null,
    addressLine1: <string>null,
    addressLine2: <string>null,
    city: <string>null,
    state: <string>null,
    zip_code: <number>null,
    gender: <string>null,
    birthDate: <string>null,
    maritalStatus: <string>null,
    education: <string>null,
    homeOwnerStatus: <string>null,
  }

  constructor(
    private quoteInfoService: QuoteInfoService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.quoteId = params['quoteId'];
        this.driver.quote.quoteId = this.quoteId;
        console.log(this.quoteId);
      }
    );
  }

    saveDriver() {
      console.log(this.driver)
      this.quoteInfoService.addRecord('addDriver', this.driver).subscribe();
      console.log("after API call");
      this.router.navigate(['vehinfo', this.quoteId])
      console.log("after pass");
    }
};