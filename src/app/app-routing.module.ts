import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardKeycloak } from './classes/keycloak-auth.guard';

const routes: Routes = [{path: "", component: AppComponent, canActivate: [AuthGuardKeycloak]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
