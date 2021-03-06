import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from '../home/home.component';
import { VehinfoComponent } from '../vehinfo/vehinfo.component';
import { TripinfoComponent } from '../tripinfo/tripinfo.component';
import { DriverinfoComponent } from '../driverinfo/driverinfo.component';
import { DistanceapiComponent } from '../tripinfo/distanceapi.component';
import { SummaryComponent } from '../summary/summary.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'vehinfo/:quoteId', component: VehinfoComponent},
    { path: 'tripinfo/:quoteId', component: TripinfoComponent},
    { path: 'driverinfo/:quoteId', component: DriverinfoComponent},
    { path: 'googleapi', component: DistanceapiComponent},
    { path: 'summary/:quoteId', component: SummaryComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
