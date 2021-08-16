import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './general/dashboard/dashboard.component';
import { LayoutComponent } from './general/layout/layout.component';
import { FormBuilderComponent } from './lib/form-builder/form-builder.component';
import { UserGroupListComponent } from './security/user-group-list/user-group-list.component';
import { UserGroupComponent } from './security/user-group/user-group.component';
import { UsersComponent } from './security/users/users.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {path:'forms', component:FormBuilderComponent },
    {path:'users', component:UsersComponent },
    {path:'userGroup', component:UserGroupListComponent },
    {path:'userGroup/create', component:UserGroupComponent },
    {path:'', component:DashboardComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
