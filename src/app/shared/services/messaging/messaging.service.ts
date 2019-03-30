import {Injectable} from '@angular/core';

import {MatSnackBar} from '@angular/material';

import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

import {Subject} from 'rxjs/internal/Subject';

import * as sockectIo from 'socket.io-client';
import {UserService} from '../../../main/user-management/shared/service/user.service';
import {SocketEvents} from '../../constants/socket-event';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  componentMethodCallSource = new Subject<any>();
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  socket;

  constructor(public snackBar: MatSnackBar, private userService: UserService) {
    this.socket = sockectIo(environment.apiEndpoint);
    this.socket.on(SocketEvents.NOTIFY, (content) => {
      this.showNotification(content);
    });
  }

  showNotification(content) {
    this.snackBar.open(content.title, 'OK', {
      duration: 2000
    });
  }

  joinRoom(){
    const userId = this.userService.userInfo.id;
    if (userId){
      console.log("JOIN emitted");
      console.log(userId);
      this.socket.emit(SocketEvents.JOIN, {userId: userId});
      this.socket.emit('test');
    }
  }

}
