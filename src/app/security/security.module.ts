import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./users/users.component";
import { MaterialModule } from "../general/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UserGroupComponent } from './user-group/user-group.component';
import { UserGroupListComponent } from './user-group-list/user-group-list.component';
import { BooleanPipe } from "../general/shared/pipes/boolean.pipe";
import { GeneralModule } from "../general/general.module";

@NgModule({
  declarations: [UsersComponent, UserGroupComponent, UserGroupListComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, GeneralModule],
})
export class SecurityModule {}
