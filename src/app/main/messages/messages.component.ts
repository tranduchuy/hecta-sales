import { Component, OnInit } from '@angular/core';
import { Meta } from './shared/model/meta.model';
import { MessagesService } from './shared/service/messages.service';
import { Message } from './shared/model/message.model';
import { HTTP_CODES } from 'app/shared/constants/http-code.constant';
import { General } from 'app/shared/constants/general.constant';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  data: Message[] = [];
  meta: Meta = {};

  NOTIFY_SEEN = General.Notification.SEEN;
  NOTIFY_NONE = General.Notification.NONE;

  currentPage: number = 1;

  displayedColumns: string[] = ['index', 'title', 'content', 'check'];

  constructor(private _messagesService: MessagesService) { }

  ngOnInit() {
    this.getMessages(1);
  }

  getMessages(currentPage) {
    this._messagesService.getMessages(currentPage).subscribe(
      (res: any) => {
        this.data = res.data.entry;
        this.meta = res.data.meta;
        console.log(this.data);
        console.log(this.meta);
      }
    )
  }

  updatePage(event) {
    console.log(event);
    this.getMessages(event.pageIndex + 1);
    this.currentPage = event.pageIndex + 1;
  }

  onToggleSeen(notify, index) {
    notify = this.data[index]._id;
    this._messagesService.seenMessage(notify, this.NOTIFY_SEEN).subscribe(
      (res: any) => {
        if (res.status === HTTP_CODES.SUCCESS) {
          this.data[index].status = this.NOTIFY_SEEN;
        }
      }
    );
  }

}