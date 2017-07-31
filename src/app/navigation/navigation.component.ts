import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() { }
  quoteId;

  driverEnabled:boolean = false;
  driverRouterLink = null;
  vehicleEnabled:boolean = false;
  vehicleRouterLink = null;
  tripEnabled:boolean = false;
  tripRouterLink = null;
  summaryEnabled:boolean = false;
  summaryRouterLink = null;



  ngOnInit() {
    this.quoteId = sessionStorage.getItem('quoteId');
    console.log("nav quote id: " + this.quoteId);
    this.setNavigation();
  }

  setNavigation() {
    if (this.driverEnabled) {
      this.driverRouterLink = "./driverinfo/" + this.quoteId;
    }  else {
      this.driverRouterLink = null;
    }

    if (this.vehicleEnabled) {
      this.vehicleRouterLink = "./vehicleinfo/" + this.quoteId;
    }  else {
      this.vehicleRouterLink = null;
    }

    if (this.tripEnabled) {
      this.tripRouterLink = "./tripinfo/" + this.quoteId;
    }  else {
      this.tripRouterLink = null;
    }

    if (this.summaryEnabled) {
      this.summaryRouterLink = "./summaryinfo/" + this.quoteId;
    }  else {
      this.summaryRouterLink = null;
    }

    console.log("Driver: " + this.driverRouterLink);
    console.log("Vehicle: " + this.vehicleRouterLink);
    console.log("Trip: " + this.tripRouterLink);
    console.log("Summary: " + this.summaryRouterLink);
  }

}
