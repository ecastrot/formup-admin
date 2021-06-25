import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./users/users.component";
import { MaterialModule } from "../general/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class SecurityModule {}
