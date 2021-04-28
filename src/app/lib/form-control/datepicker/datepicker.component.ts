/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Constants } from './../common/constants';
import { AswConfirmDialogComponent } from './../shared/confirm-dialog/confirm-dialog.component';
import { AswDatepickerDialogComponent } from './datepicker-dialog.component';

@Component({
    selector: 'asw-datepicker',
    templateUrl: './datepicker.component.html'
})
export class AswDatepickerComponent {

    constants: any = Constants;
    /**
     * Datepicker control
     */
    @Input() control: any;

    /**
     * Datepicker control index to help update or delete button from drop area
     */
    @Input() controlIndex: number;
    @Input() isPreviewTemplate = false;

    @Output() datepickerUpdateEvent = new EventEmitter<{control: any, index: number}>();
    @Output() datepickerDeleteEvent = new EventEmitter<number>();

    constructor(public dialog: MatDialog) { }

    /**
     * Delete datepicker control based on control index
     * @param control datepicker control items
     * @param controlIndex datepicker control index
     */
      deleteDatepickerDialog(control: any, controlIndex: number): void {
        const dialogRef = this.dialog.open(AswConfirmDialogComponent, {
            width: '350px',
            data: { name: control.name, message: this.constants.messages.waringMessage }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.datepickerDeleteEvent.emit(controlIndex);
            }
        });
    }

    editDatepickerDialog(control: any, controlIndex: number): void {
        const dialogRef = this.dialog.open(AswDatepickerDialogComponent, {
            disableClose: true,
            width: '744px',
            data: control
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.datepickerUpdateEvent.emit({control: result, index: controlIndex});
            }
        });
    }
}
