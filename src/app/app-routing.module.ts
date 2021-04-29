import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './general/dashboard/dashboard.component';
import { LayoutComponent } from './general/layout/layout.component';
import { FormBuilderComponent } from './lib/form-builder/form-builder.component';
import { UsersComponent } from './security/users/users.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {path:'forms', component:FormBuilderComponent },
    {path:'users', component:UsersComponent },
    {path:'', component:DashboardComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
