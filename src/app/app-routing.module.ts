import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './general/dashboard/dashboard.component';
import { LayoutComponent } from './general/layout/layout.component';
import { CreateFormWizardComponent } from './my-forms/create-form-wizard/create-form-wizard.component';
import { UserGroupListComponent } from './security/user-group-list/user-group-list.component';
import { UserGroupComponent } from './security/user-group/user-group.component';
import { UserListComponent } from './security/user-list/user-list.component';
import { UsersComponent } from './security/users/users.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {path:'forms', component:CreateFormWizardComponent },
    {path:'users', component:UserListComponent },
    {path:'users/create', component:UsersComponent },
    {path:'users/create/:id', component:UsersComponent },
    {path:'userGroup', component:UserGroupListComponent },
    {path:'userGroup/create', component:UserGroupComponent },
    {path:'userGroup/create/:id', component:UserGroupComponent },
    {path:'', component:DashboardComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
