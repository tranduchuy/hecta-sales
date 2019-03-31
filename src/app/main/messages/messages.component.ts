import { Component, OnInit } from '@angular/core';
import { FuseProgressBarService } from '../../../@fuse/components/progress-bar/progress-bar.service';
import { Meta } from './shared/model/meta.model';
import { MessagesService } from './shared/service/messages.service';
import { Message } from './shared/model/message.model';
import { HTTP_CODES } from 'app/shared/constants/http-code.constant';
import { General } from 'app/shared/constants/general.constant';
import { DialogService } from 'app/shared/components/dialog/dialog.service';
import { PageBaseComponent } from 'app/shared/components/base/page-base.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent extends PageBaseComponent implements OnInit {
  data: Message[] = [];
  meta: Meta = {};
  NOTIFY_SEEN = General.Notification.SEEN;
  NOTIFY_NONE = General.Notification.NONE;
  currentPage = 1;
  displayedColumns: string[] = ['index', 'title', 'content', 'check'];

  constructor(private _messagesService: MessagesService,
              private _fuseProgressBarService: FuseProgressBarService,
              private _dialog: DialogService) {
    super();
  }

  ngOnInit(): void {
    this.getMessages(1);
  }

  getMessages(currentPage): void {
    this._fuseProgressBarService.show();
    const sub = this._messagesService.getMessages(currentPage).subscribe(
      (res: any) => {
        this.data = res.data.entry;
        this.meta = res.data.meta;
        this._fuseProgressBarService.hide();
      }
    );

    this.subscriptions.push(sub);
  }

  updatePage(event): void {
    this.getMessages(event.pageIndex + 1);
    this.currentPage = event.pageIndex + 1;
  }

  onToggleSeen(notify, index): void {
    notify = this.data[index]._id;
    this._fuseProgressBarService.show();
    this._messagesService.seenMessage(notify, this.NOTIFY_SEEN).subscribe(
      (res: any) => {
        if (res.status === HTTP_CODES.SUCCESS) {
          this.data[index].status = this.NOTIFY_SEEN;
        }
        this._fuseProgressBarService.hide();
      }
    );
  }

  onLoadMoreTransactions(): void {
    this.currentPage = this.currentPage + 1;
    this._fuseProgressBarService.show();
    const sub = this._messagesService.getMessages(this.currentPage).subscribe(
      (res: any) => {
        if (res.status === HTTP_CODES.SUCCESS) {
          const newData = res.data.entry;
          this.data = this.data.concat(newData);
        } else {
          this._dialog.openInfo('Không lấy được dữ liệu!')
            .subscribe()
            .unsubscribe();
        }

        this._fuseProgressBarService.hide();
      });

    this.subscriptions.push(sub);
  }
}
