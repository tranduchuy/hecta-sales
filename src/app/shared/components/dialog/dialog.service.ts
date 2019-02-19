import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, Observer } from 'rxjs';
import { InfoDialogComponent } from './info/info-dialog.component';

export enum DialogResult {
  OK,
  CANCEL
}

@Injectable()
export class DialogService {
  constructor(public dialog: MatDialog) {

  }

  openInfo(message: string): Observable<DialogResult> {
    return Observable.create((observer: Observer<DialogResult>) => {
      const dialogRef = this.dialog.open(InfoDialogComponent, {
        width: '250px',
        data: {message}
      });

      dialogRef.afterClosed().subscribe((value: DialogResult) => {
        observer.next(value);
        observer.complete();
      });
    });
  }
}
