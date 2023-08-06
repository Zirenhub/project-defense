import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reply } from 'src/app/types/Reply';

@Component({
  selector: 'app-replying-reply-modal',
  templateUrl: './replying-reply-modal.component.html',
})
export class ReplyingReplyModalComponent {
  @Input() comment?: Reply;
  @Output() reply = new EventEmitter<string>();
  @Output() close = new EventEmitter();

  replyText = '';

  handleClose() {
    this.close.emit();
  }

  handleReply() {
    this.reply.emit(this.replyText);
  }
}
