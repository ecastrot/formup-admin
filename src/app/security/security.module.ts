import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./users/users.component";
import { MaterialModule } from "../general/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UserGroupComponent } from './user-group/user-group.component';

@NgModule({
  declarations: [UsersComponent, UserGroupComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class SecurityModule {}
