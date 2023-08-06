import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tweet } from 'src/app/types/Tweet';

@Component({
  selector: 'app-replying-tweet-modal',
  templateUrl: './replying-tweet-modal.component.html',
})
export class ReplyingTweetModalComponent {
  @Input() tweet?: Tweet;
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
