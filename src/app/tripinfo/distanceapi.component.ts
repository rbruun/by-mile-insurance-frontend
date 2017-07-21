import { Component, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule } from "@angular/forms";
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

  public distanceBetween;

  constructor(
    private _loader: MapsAPILoader,
    private _zone: NgZone

  ) { }

  setDistance(someDistance) {
    console.log("hi disntace");
    this.distanceBetween = someDistance;
  }


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
        console.log("no routes available for those addresses");
        this.errorMessage = ("no routes available for those addresses");
      } else {
        this._zone.run(() => {
          this.distanceBetween = response.rows[0].elements[0].distance.text;
          this.distanceBetween = this.distanceBetween.replace(/[^\d]/g, '');
          console.log("distanceBetween: " + this.distanceBetween);
      })
    }
  }
}
}