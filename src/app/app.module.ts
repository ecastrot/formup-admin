import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilderModule, PreviewTemplateModule } from './lib';
import { GeneralModule } from './general/general.module';
import { SecurityModule } from './security/security.module';
import { FormsModule } from '@angular/forms';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { MyFormsModule } from './my-forms/my-forms.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormBuilderModule,
    PreviewTemplateModule,
    GeneralModule,
    FormsModule,
    SecurityModule,
    MyFormsModule,
    AmplifyUIAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
