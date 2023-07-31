import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';

@Component({
  selector: 'app-open-tweet-container',
  templateUrl: './open-tweet-container.component.html',
})
export class OpenTweetContainerComponent {
  @Input() content?: Tweet | Reply;
  @Output() like = new EventEmitter<string>();
  @Output() retweet = new EventEmitter<string>();
  @Output() reply = new EventEmitter<string>();

  replyText: string = '';

  handleLike() {
    if (this.content) {
      this.like.emit(this.content._id);
    }
  }

  handleRetweet() {
    if (this.content && !this.content.isRetweeted) {
      this.retweet.emit(this.content._id);
    }
  }

  handleReply() {
    if (this.replyText) {
      this.reply.emit(this.replyText);
      this.replyText = '';
    }
  }
}
