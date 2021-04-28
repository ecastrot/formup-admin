/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constants } from '../common/constants';

@Component({
  selector: 'asw-slide-toggle-dialog',
  templateUrl: './slide-toggle-dialog.component.html'
})
export class AswSlideToggleDialogComponent implements OnInit {
    constants: any = Constants;
    aswEditSlideToggleForm: FormGroup;
    status: boolean;
    constructor(private formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<AswSlideToggleDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public control: any) { }

    ngOnInit(): void {
        this.validateFormBuilder();
        this.editProperty(this.control);
    }

    validateFormBuilder(): void {
        this.aswEditSlideToggleForm = this.formBuilder.group({
            label: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
            color: [],
            isRequired: [false]
        });
    }

    editProperty(control: any): void {
        this.aswEditSlideToggleForm.setValue({
            label: control.label,
            color: control.color,
            isRequired: control.isRequired
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        if (this.aswEditSlideToggleForm.invalid){
            return;
        }
        this.aswEditSlideToggleForm.value.displayName = this.control.displayName;
        this.aswEditSlideToggleForm.value.controlType = this.control.controlType;
        this.dialogRef.close(this.aswEditSlideToggleForm.value);
    }

    onChange(event: any): void {
        if (event.checked) {
            this.status = true;
        } else {
            this.status = false;
        }
    }
}
