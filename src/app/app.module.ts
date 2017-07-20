import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { JsonpModule, HttpModule } from '@angular/http';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { MdDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './routing/routing.module';
import { VehInfoService } from './veh-info.service';
import { DriverinfoComponent } from './driverinfo/driverinfo.component';
import { QuoteInfoService } from './quote-info.service';
import { VehinfoComponent } from './vehinfo/vehinfo.component';
import { TripinfoComponent } from './tripinfo/tripinfo.component';
import { DistanceapiComponent } from './tripinfo/distanceapi.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VehinfoComponent,
    TripinfoComponent,
    DriverinfoComponent,
    DistanceapiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    MdDialogModule,
    AgmCoreModule.forRoot({
      libraries: ["places"],
      apiKey: 'AIzaSyCvMeDoja1YeBEe9nRgvc1mKmrhBfyFzSM'
    }),
    BrowserAnimationsModule
  ],
  providers: [VehInfoService, QuoteInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
