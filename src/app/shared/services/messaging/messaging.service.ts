import {Injectable} from '@angular/core';

import {MatSnackBar} from '@angular/material';

import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

import {Subject} from 'rxjs/internal/Subject';

import * as sockectIo from 'socket.io-client';
import {UserService} from '../../../main/user-management/shared/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  componentMethodCallSource = new Subject<any>();
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  socket;

  constructor(public snackBar: MatSnackBar, private userService: UserService) {
    this.socket = sockectIo('https://api.hecta.vn/');
    if (this.userService.userInfo.id){
      this.socket.emit('join', {userId: this.userService.userInfo._id});
      this.socket.on('NOTIFY', (content) => {
        this.showNotification(content);
      });
    }
  }

  showNotification(content) {
    this.snackBar.open(content.title, 'OK', {
      duration: 2000
    });
  }

}
