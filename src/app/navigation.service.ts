import { Injectable, OnInit } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class NavigationService {

    private driverAnnouncedSource = new Subject<string>();
    private vehicleAnnoucedSource = new Subject<string>();
    private tripAnnoucedSource = new Subject<string>();
    private summaryAnnoucedSource = new Subject<string>();

  driverAnnounced$ = this.driverAnnouncedSource.asObservable();
  vehicleAnnounced$ = this.vehicleAnnoucedSource.asObservable();
  tripAnnounced$ = this.tripAnnoucedSource.asObservable();
  summaryAnnounced$ = this.summaryAnnoucedSource.asObservable();

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