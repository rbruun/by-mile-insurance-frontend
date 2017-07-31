import { Injectable, OnInit } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class NavigationService {

    private homeAnnouncedSource = new Subject<string>();
    private driverAnnouncedSource = new Subject<string>();
    private vehicleAnnoucedSource = new Subject<string>();
    private tripAnnoucedSource = new Subject<string>();
    private summaryAnnoucedSource = new Subject<string>();

  homeAnnounced$ = this.homeAnnouncedSource.asObservable();
  driverAnnounced$ = this.driverAnnouncedSource.asObservable();
  vehicleAnnounced$ = this.vehicleAnnoucedSource.asObservable();
  tripAnnounced$ = this.tripAnnoucedSource.asObservable();
  summaryAnnounced$ = this.summaryAnnoucedSource.asObservable();

  announceHome() {
    this.homeAnnouncedSource.next(null);
  }   
  announceDriver() {
    this.driverAnnouncedSource.next(null);
  }    

  announceVehicle(){
    this.vehicleAnnoucedSource.next(null);
  }

  announceTrip(){
    this.tripAnnoucedSource.next(null);
  }  

  announceSummary(){
    this.summaryAnnoucedSource.next(null);
  }  
}