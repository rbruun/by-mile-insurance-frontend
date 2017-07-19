
import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

// import { QuoteService } from '../quote.service'

@Component({
  selector: 'app-driverinfo',
  templateUrl: './driverinfo.component.html',
  styleUrls: ['./driverinfo.component.css']
})

export class DriverinfoComponent implements OnInit {


 driver =
    {firstName: <string> null,
    last_name: <string> null,
    addressLine1: <string> null,
    addressLine2: <string> null,
    city: <string> null,
    state: <string> null,
    zip_code: <number> null,
    gender: <string> null,
    birthDate: <number> null,
    maritalStatus: <string> null,
    education: <string> null,
    homeOwnerStatus: <string> null,
  }

buttonClicked() {
  console.log(this.driver)

  // saveDriver(id) {
  //     if (typeof id === 'number') {
  //       this.quoteService.editRecord('driver', this.driver, id)
  //           .subscribe(
  //             student => this.successMessage = 'Record updated succesfully',
  //             error =>  this.errorMessage = <any>error);
  //     }else {
  //       this.quoteService.addRecord('driver', this.driver)
  //           .subscribe(
  //             student => this.successMessage = 'Record added succesfully',
  //             error =>  this.errorMessage = <any>error);
  //     }
}

constructor() { }

ngOnInit() {

}

  };
