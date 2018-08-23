import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebsiteComponent } from './website/website.component';
import { SettingsComponent } from './settings/settings.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DialogComponent } from './settings/dialog/dialog.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import {NgxPaginationModule} from 'ngx-pagination';

import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { UserProfileComponent } from './settings/user-profile/user-profile.component';
import { SearchPipe } from './website/search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    WebsiteComponent,
    SettingsComponent,
    DialogComponent,
    UserProfileComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatSlideToggleModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
