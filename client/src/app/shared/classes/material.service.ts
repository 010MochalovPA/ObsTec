import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) {}

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  openDialog(dialogRef: TemplateRef<any>) {
    this.dialog.open(dialogRef);
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}
