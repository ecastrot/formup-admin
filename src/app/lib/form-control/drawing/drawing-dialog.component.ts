/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'asw-drawing-dialog',
    templateUrl: './drawing-dialog.component.html'
})
export class AswDrawingDialogComponent {

    public width  = 600;
    public height = 250;

    constructor(public dialogRef: MatDialogRef<AswDrawingDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public control: any) { }



    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit(aswEditPropertyForm: NgForm): void {
        if (aswEditPropertyForm.invalid) {
            return;
        }
        // this.model.displayName = this.control.displayName;
        // this.model.controlType = this.control.controlType;
        // this.model.name = this.name;
        // this.model.label = this.label;
        // this.model.tooltip = this.tooltip;
        // if (this.control.controlType !== 'radio' || this.control.controlType !== 'checkbox') {
        //     this.model.style = this.style;
        // }
        // this.model.isRequired = this.isRequired;
        // this.model.options = this.options;
        // this.dialogRef.close(this.model);
    }
}
