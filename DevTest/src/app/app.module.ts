import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatDatepicker, MatDatepickerModule } from "@angular/material/datepicker";

import { MatToolbarModule } from "@angular/material/toolbar";
import { UserListViewComponent } from './components/user-list-view/user-list-view.component';
import { JobListViewComponent } from './components/job-list-view/job-list-view.component';
import { JobViewComponent } from './components/job-view/job-view.component';
import { HttpClientModule } from '@angular/common/http';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditJobComponent } from './edit-job/edit-job.component';

@NgModule({
  declarations: [
    AppComponent,
    UserViewComponent,
    UserListViewComponent,
    JobListViewComponent,
    JobViewComponent,
    EditUserComponent,
    EditJobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
