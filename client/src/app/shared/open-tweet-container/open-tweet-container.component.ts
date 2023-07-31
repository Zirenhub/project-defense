import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';
import { Location } from '@angular/common';

@Component({
  selector: 'app-open-tweet-container',
  templateUrl: './open-tweet-container.component.html',
})
export class OpenTweetContainerComponent {
  @Input() content?: Tweet | Reply;
  @Output() like = new EventEmitter<string>();
  @Output() reply = new EventEmitter<string>();

  replyText: string = '';

  constructor(private location: Location) {}

  back() {
    this.location.back();
  }

  handleLike() {
    if (this.content) {
      this.like.emit(this.content._id);
    }
  }

  handleReply() {
    if (this.replyText) {
      this.reply.emit(this.replyText);
      this.replyText = '';
    }
  }
}
