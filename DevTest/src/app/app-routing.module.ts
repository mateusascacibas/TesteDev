import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListViewComponent } from './components/job-list-view/job-list-view.component';
import { JobViewComponent } from './components/job-view/job-view.component';
import { UserListViewComponent } from './components/user-list-view/user-list-view.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {path: "", component: UserListViewComponent},
  {path: "user", component: UserViewComponent},
  {path: "jobs", component: JobViewComponent},
  {path: "listJobs", component: JobListViewComponent,},
  {path: "editUser/:id", component: EditUserComponent,},
  {path: "editJob/:id", component: EditJobComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
