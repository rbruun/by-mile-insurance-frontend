import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private navigationService: NavigationService) { 

    this.subscription = navigationService.driverAnnounced$.subscribe(
        empty => {        
        this.driverEnabled = true;
        this.vehicleEnabled = false;
        this.tripEnabled = false;
        this.summaryEnabled = false;
        this.setNavigation();
    });

    this.subscription = navigationService.vehicleAnnounced$.subscribe(
        empty => {       
        this.vehicleEnabled = true;
        this.tripEnabled = false;
        this.summaryEnabled = false;
        this.setNavigation();
    });  
      
    this.subscription = navigationService.tripAnnounced$.subscribe(
        empty => {     
        this.tripEnabled = true;
        this.summaryEnabled = false;
        this.setNavigation();
    });    

    this.subscription = navigationService.summaryAnnounced$.subscribe(
        empty => {        
        this.summaryEnabled = true;
        this.setNavigation();
    });     
  }
  quoteId;

  subscription: Subscription;

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
      this.vehicleRouterLink = "./vehinfo/" + this.quoteId;
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

  }

}
