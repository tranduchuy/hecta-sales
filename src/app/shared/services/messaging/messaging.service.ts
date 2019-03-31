import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import * as socketIO from 'socket.io-client';
import { UserService } from '../../../main/user-management/shared/service/user.service';
import { SocketEvents } from '../../constants/socket-event';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  socket = null;

  constructor(public snackBar: MatSnackBar,
              private userService: UserService) {
    this.socket = socketIO(environment.apiEndpoint);
    this.socket.on(SocketEvents.NOTIFY, (content) => {
      this.showNotification(content);
    });
  }

  showNotification(content): void {
    this.snackBar.open(content.title, 'OK', {
      duration: 2000
    });
  }

  joinRoom(): void {
    const userId = this.userService.userInfo.id;
    if (userId) {
      this.socket.emit(SocketEvents.JOIN, {userId: userId});
    }
  }

}
