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
import { AswImageUploadDialogComponent } from './image-upload-dialog.component';

@Component({
  selector: 'asw-image',
  templateUrl: './image.component.html'
})
export class AswImageComponent {

  constants: any = Constants;

  @Input() control: any;

  @Input() controlIndex: number;
  @Input() isPreviewTemplate = false;

  @Output() imageUpdateEvent = new EventEmitter<{ control: any, index: number }>();
  @Output() imageDeleteEvent = new EventEmitter<number>();

  constructor(public dialog: MatDialog) { }

  deleteImageDialog(control: any, controlIndex: number): void {
    const dialogRef = this.dialog.open(AswConfirmDialogComponent, {
      width: '350px',
      data: { name: control.label, message: this.constants.messages.waringMessage }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.imageDeleteEvent.emit(controlIndex);
      }
    });
  }

  editImageDialog(control: any, controlIndex: number): void {
    const dialogRef = this.dialog.open(AswImageUploadDialogComponent, {
      disableClose: true,
      width: '744px',
      data: control
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.imageUpdateEvent.emit({ control: result, index: controlIndex });
      }
    });
  }
}
