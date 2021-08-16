import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from '../shared/model/confirm-dialog-data';

@Component({
  selector: 'fu-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  // confirmData: ConfirmDialogData;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
    // this.confirmData = data.
   }

  ngOnInit(): void {
  }

}
