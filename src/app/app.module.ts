import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { JsonpModule, HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './routing/routing.module';
import { VehInfoService } from './veh-info.service';
import { VehinfoComponent } from './vehinfo/vehinfo.component';
import { DriverinfoComponent } from './driverinfo/driverinfo.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VehinfoComponent,
    DriverinfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule
  ],
  providers: [VehInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
