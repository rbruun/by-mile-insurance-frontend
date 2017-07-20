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

  constructor(
    private _loader: MapsAPILoader,
    private _zone: NgZone
    ) { }
     

  ngOnInit()
  {
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
              console.log(this.endPlace);
            });
        });
    });
  }

}