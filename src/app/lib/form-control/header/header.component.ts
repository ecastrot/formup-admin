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
import { AswHeaderDialogComponent } from './header-dialog.component';

@Component({
    selector: 'asw-header',
    templateUrl: './header.component.html'
})
export class AswHeaderComponent {

    constants: any = Constants;
    /**
     * Header control
     */
    @Input() control: any;

    /**
     * Header control index to help update or delete button from drop area
     */
    @Input() controlIndex: number;
    @Input() isPreviewTemplate = false;

    @Output() headerUpdateEvent = new EventEmitter<{control: any, index: number}>();
    @Output() headerDeleteEvent = new EventEmitter<number>();

    constructor(public dialog: MatDialog) { }

    /**
     * Delete header control based on control index
     * @param control header control items
     * @param controlIndex header control index
     */
    deleteHeaderDialog(control: any, controlIndex: number): void {
        const dialogRef = this.dialog.open(AswConfirmDialogComponent, {
            width: '350px',
            data: { name: control.label, message: this.constants.messages.waringMessage }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.headerDeleteEvent.emit(controlIndex);
            }
        });
    }

    editHeaderDialog(control: any, controlIndex: number): void {
        const dialogRef = this.dialog.open(AswHeaderDialogComponent, {
            disableClose: true,
            width: '744px',
            data: control
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.headerUpdateEvent.emit({control: result, index: controlIndex});
            }
        });
    }
}
