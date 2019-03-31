import { Injectable, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, Observer } from 'rxjs';
import { ConfirmDialogComponent } from './confirm/confirm-dialog.component';
import { InfoDialogComponent } from './info/info-dialog.component';
import { WarningDialogComponent } from './warning/warning-dialog.component';
import { TextDialogComponent } from './text/text-dialog.component';

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

  openWarning(message: string): Observable<DialogResult> {
    return Observable.create((observer: Observer<DialogResult>) => {
      const dialogRef = this.dialog.open(WarningDialogComponent, {
        width: '500px',
        data: {message}
      });
      dialogRef.afterClosed().subscribe((value: DialogResult) => {
        observer.next(value);
        observer.complete();
      });
    });
  }

  openConfirm(message: string): Observable<DialogResult> {
    return Observable.create((observer: Observer<DialogResult>) => {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '250px',
        data: {message}
      });

      dialogRef.afterClosed().subscribe((value: DialogResult) => {
        observer.next(value);
        observer.complete();
      });
    });
  }

  openText(message: string): Observable<DialogResult> {
    return Observable.create((observer: Observer<DialogResult>) => {
      const dialogRef = this.dialog.open(TextDialogComponent, {
        width: '250px',
        data: {message, text: 'data'}
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        observer.next(result);
        observer.complete();
      });
    });
  }
}
