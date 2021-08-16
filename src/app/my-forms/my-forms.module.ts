import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateFormWizardComponent } from "./create-form-wizard/create-form-wizard.component";
import { MaterialModule } from "../general/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [CreateFormWizardComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class MyFormsModule {}
