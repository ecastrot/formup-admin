import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class MessagesService {
  constructor(private _snackBar: MatSnackBar) {}

  showMessage(message: string, action?: string) {
    action = !!action ? action : "x";
    this._snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }
}
