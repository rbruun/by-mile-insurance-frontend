
import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, NgForm, FormsModule, Validators } from '@angular/forms';

import { QuoteInfoService } from '../quote-info.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-driverinfo',
  templateUrl: './driverinfo.component.html',
  styleUrls: ['./driverinfo.component.css']
})

export class DriverinfoComponent implements OnInit {

  driverForm: NgForm;
  @ViewChild('driverForm') currentForm: NgForm;

  quoteId: string;

  driver =
  {
    quote: {quoteId: <string>null},
    driverId: <string>null,
    firstName: <string>null,
    lastName: <string>null,
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

  drivers = [];
  driversTotal = {
    quote: {quoteId: <string> null},
    driverId: <string> null,
  }

  errorMessage: string;
  successMesssage: string;

  driverFormControl = new FormControl('', [
  Validators.required]);

  constructor(
    private quoteInfoService: QuoteInfoService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private navService: NavigationService
  ) { }



  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.quoteId = params['quoteId'];
        this.driver.quote.quoteId = this.quoteId;
        console.log(this.quoteId);
      }
    );
    this.getDrivers();
    this.announce();
  }


addDriver() {
  // call the data service to add trip
  if (this.driver.driverId == null) {
  this.quoteInfoService.addRecord('addDriver', this.driver).subscribe(
    driver => {this.getDrivers(); this.resetDriver()}
  );
}else {
  this.quoteInfoService.editRecord('updateDriver', this.driver).subscribe(
    driver => {this.getDrivers(); this.resetDriver()}
  );
}
  this.driverForm.resetForm();
}

getDrivers() {
console.log("getDrivers");
  this.quoteInfoService.getRecords("getDrivers", this.quoteId)
    .subscribe(
      drivers => {this.drivers = drivers},
      error =>  this.errorMessage = <any>error);
}

deleteDriver(id: number) {
      this.quoteInfoService.deleteRecord("deleteDriver", id)
        .subscribe(
          driver => {this.successMesssage = "Record(s) deleted succesfully";
                  console.log("record deleted");this.getDrivers(); },
          error =>  console.log(error));
}

goToVehicle() {
  this.driversTotal.quote.quoteId = this.quoteId;
  // route to the vehicle page
  this.router.navigate(['vehinfo', this.quoteId]);
}

editDriver(driverId) {
  console.log("editing driver " + driverId);
  // call service to get vehicle, populate vehicle object tied to view
  this.quoteInfoService.getRecord("getDriver", driverId)
  .subscribe(
      driver => {
        this.driver = null;
        this.driver = driver;
      }
    )

}

resetDriver(){
  this.driver.firstName = null;
  this.driver.lastName = null;
  this.driver.addressLine1 = null;
  this.driver.addressLine2 = null;
  this.driver.city = null;
  this.driver.state = null;
  this.driver.zip_code = null;
  this.driver.gender = null;
  this.driver.birthDate = null;
  this.driver.maritalStatus = null;
  this.driver.education = null;
  this.driver.homeOwnerStatus = null;
}

ngAfterViewChecked() {
  this.formChanged();
}

formChanged() {
  this.driverForm = this.currentForm;
  this.driverForm.valueChanges
    .subscribe(
      data => this.onValueChanged(data)
    );
}

onValueChanged(data?: any) {
  let form = this.driverForm.form;
}

announce () {
  this.navService.announceDriver();
}

};
