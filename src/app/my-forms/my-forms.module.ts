import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateFormWizardComponent } from "./create-form-wizard/create-form-wizard.component";
import { MaterialModule } from "../general/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateFormComponent } from './create-form/create-form.component';
import { FormBuilderModule } from "../lib/form-builder/form-builder.module";
import { AssignFormComponent } from './assign-form/assign-form.component';

@NgModule({
  declarations: [CreateFormWizardComponent, CreateFormComponent, AssignFormComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, FormBuilderModule],
})
export class MyFormsModule {}
