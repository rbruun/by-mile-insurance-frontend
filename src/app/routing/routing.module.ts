import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from '../home/home.component';
import { VehinfoComponent } from '../vehinfo/vehinfo.component';
import { DriverinfoComponent } from '../driverinfo/driverinfo.component';
import { RouteinfoComponent } from '../routeinfo/routeinfo.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'vehinfo/:quoteId', component: VehinfoComponent},
    { path: 'routeinfo/:quoteId', component: RouteinfoComponent},
    { path: 'driverinfo/:quoteId', component: DriverinfoComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
