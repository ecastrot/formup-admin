import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./users/users.component";
import { MaterialModule } from "../general/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserGroupComponent } from './user-group/user-group.component';
import { UserGroupListComponent } from './user-group-list/user-group-list.component';
import { GeneralModule } from "../general/general.module";
import { AppRoutingModule } from "../app-routing.module";

@NgModule({
  declarations: [UsersComponent, UserGroupComponent, UserGroupListComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, GeneralModule, AppRoutingModule],
})
export class SecurityModule {}
