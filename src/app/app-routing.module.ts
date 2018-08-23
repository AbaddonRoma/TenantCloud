import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WebsiteComponent} from './website/website.component';
import {SettingsComponent} from './settings/settings.component';
import {UserProfileComponent} from './settings/user-profile/user-profile.component';

const routes: Routes = [
  {path: '',  component: WebsiteComponent},
  {path: 'settings',  component: SettingsComponent},
  {path: 'settings/manageProfile', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
