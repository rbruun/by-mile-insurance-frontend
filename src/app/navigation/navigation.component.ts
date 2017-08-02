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

    this.subscription = navigationService.homeAnnounced$.subscribe(
        empty => {
        this.driverEnabled = false;
        sessionStorage.setItem('driverEnabled', 'false');
        this.vehicleEnabled = false;
        sessionStorage.setItem('vehicleEnabled', 'false');
        this.tripEnabled = false;
        sessionStorage.setItem('tripEnabled', 'false');
        this.summaryEnabled = false;
        sessionStorage.setItem('summaryEnabled', 'false');
        this.setNavigation();
    });

    this.subscription = navigationService.driverAnnounced$.subscribe(
        empty => {
        sessionStorage.setItem('driverEnabled', 'true');
        this.driverEnabled = true;
        this.vehicleEnabled = false;
        sessionStorage.setItem('vehicleEnabled', 'false');
        this.tripEnabled = false;
        sessionStorage.setItem('tripEnabled', 'false');
        this.summaryEnabled = false;
        sessionStorage.setItem('summaryEnabled', 'false');
        this.setNavigation();
    });

    this.subscription = navigationService.vehicleAnnounced$.subscribe(
        empty => {
        this.vehicleEnabled = true;
        sessionStorage.setItem('vehicleEnabled', 'true');
        this.tripEnabled = false;
        sessionStorage.setItem('tripEnabled', 'false');
        this.summaryEnabled = false;
        sessionStorage.setItem('summaryEnabled', 'false');
        this.setNavigation();
    });

    this.subscription = navigationService.tripAnnounced$.subscribe(
        empty => {
        this.tripEnabled = true;
        sessionStorage.setItem('tripEnabled', 'true');
        this.summaryEnabled = false;
        sessionStorage.setItem('summaryEnabled', 'false');
        this.setNavigation();
    });

    this.subscription = navigationService.summaryAnnounced$.subscribe(
        empty => {
        this.summaryEnabled = true;
        sessionStorage.setItem('summaryEnabled', 'true');
        this.setNavigation();
    });
  }
  quoteId;


  subscription: Subscription;
  homeRouterLink = "./home";
  driverEnabled:boolean = false;
  driverRouterLink = null;
  vehicleEnabled:boolean = false;
  vehicleRouterLink = null;
  tripEnabled:boolean = false;
  tripRouterLink = null;
  summaryEnabled:boolean = false;
  summaryRouterLink = null;



  ngOnInit() {
    if (sessionStorage.getItem('driverEnabled') == 'true') {
      this.driverEnabled = true;
    }
    if (sessionStorage.getItem('vehicleEnabled') == 'true') {
      this.vehicleEnabled = true;
    }
    if (sessionStorage.getItem('tripEnabled') == 'true') {
      this.tripEnabled = true;
    }
    if (sessionStorage.getItem('summaryEnabled') == 'true') {
      this.summaryEnabled = true;
    }
    this.setNavigation();
  }

  setNavigation() {
    this.quoteId = sessionStorage.getItem('quoteId');

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
