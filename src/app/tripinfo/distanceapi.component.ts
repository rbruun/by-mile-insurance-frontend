import { Component, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, Validators } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

declare var google: any;



@Component({
  selector: 'app-distanceapi',
  templateUrl: './distanceapi.component.html',
  styleUrls: ['./distanceapi.component.css']
})
export class DistanceapiComponent implements OnInit {

  private startPlace;
  private endPlace;
  errorMessage = null;

    autocompleteEndFormControl = new FormControl('', [
    Validators.required]);

    autocompleteStartFormControl = new FormControl('', [
    Validators.required]);    

  public distanceBetween;

  constructor(
    private _loader: MapsAPILoader,
    private _zone: NgZone

  ) { }

  ngOnInit() {
    this.autocomplete();
  }

  autocomplete() {
    this._loader.load().then(() => {
      var autocompleteStart = new google.maps.places.Autocomplete(document.getElementById("autocompleteStart"), {});
      google.maps.event.addListener(autocompleteStart, 'place_changed', () => {
        this._zone.run(() => {
          this.startPlace = autocompleteStart.getPlace();

          console.log(this.startPlace.formatted_address);
        });
      });

      var autocompleteEnd = new google.maps.places.Autocomplete(document.getElementById("autocompleteEnd"), {});
      google.maps.event.addListener(autocompleteEnd, 'place_changed', () => {
        this._zone.run(() => {
          this.endPlace = autocompleteEnd.getPlace();
          console.log(this.endPlace.formatted_address);
        });
      });
    });
  }

  calculateDistance() {
    this.errorMessage = null;
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [this.startPlace.formatted_address],
        destinations: [this.endPlace.formatted_address],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, (response, status) => this.distanceCallback(response, status));
  }

  distanceCallback(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      console.log(status);
    } else {
      var origin = response.originAddresses[0];
      var destination = response.destinationAddresses[0];
      if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
        this._zone.run(() => {
          this.errorMessage = ("No routes available for those addresses");
        })
      } else {
        // need to do this inside of run because API is not part of Angular default zonee
        this._zone.run(() => {
          this.distanceBetween = response.rows[0].elements[0].distance.text;
          this.distanceBetween = Math.ceil(this.distanceBetween.replace(/[^0-9&&^.]/g, ""));  
      })
    }
  }
}
}