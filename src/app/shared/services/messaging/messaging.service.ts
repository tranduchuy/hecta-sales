import {Injectable} from '@angular/core';

import {MatSnackBar} from '@angular/material';

import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

import {Subject} from 'rxjs/internal/Subject';

import * as sockectIo from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  componentMethodCallSource = new Subject<any>();
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  socket;

  constructor(public snackBar: MatSnackBar) {
    this.socket = sockectIo('https://api.hecta.vn/');
    this.socket.emit('join', {token: localStorage['id_token']});

    this.socket.on('messaging', (notification) => {
      this.snackBar.open(notification.title, 'OK', {
        duration: 2000
      });
    });

  }



}
