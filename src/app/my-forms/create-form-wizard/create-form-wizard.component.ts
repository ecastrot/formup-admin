import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { $t } from 'src/app/general/shared/app.texto';

@Component({
  selector: 'fu-create-form-wizard',
  templateUrl: './create-form-wizard.component.html',
  styleUrls: ['./create-form-wizard.component.scss']
})
export class CreateFormWizardComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  firstStep = $t.forms.wizard.createForm.title;
  secondStep = $t.forms.wizard.assignForm.title;
  thridStep = $t.forms.wizard.end.title;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
