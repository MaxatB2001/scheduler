import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeeklySchedulerComponent } from './weekly-scheduler/weekly-scheduler.component';
import { AuthGuardKeycloak } from '../classes/keycloak-auth.guard';

const routes: Routes = [{path: "", component: WeeklySchedulerComponent, canActivate: [AuthGuardKeycloak]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeeklySchedulerRoutingModule { }
