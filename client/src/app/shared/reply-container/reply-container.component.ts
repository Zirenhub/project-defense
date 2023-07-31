import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reply } from 'src/app/types/Reply';

@Component({
  selector: 'app-reply-container',
  templateUrl: './reply-container.component.html',
})
export class ReplyContainerComponent {
  @Input() comment: Reply | null = null;
  @Output() like = new EventEmitter<string>();
  @Output() reply = new EventEmitter<string>();
  @Output() retweet = new EventEmitter<string>();

  handleLike($event: Event) {
    $event.stopPropagation();
    if (this.comment) {
      this.like.emit(this.comment._id);
    }
  }

  handleReply($event: Event) {
    $event.stopPropagation();
    if (this.comment) {
      this.reply.emit(this.comment._id);
    }
  }

  handleRetweet($event: Event) {
    $event.stopPropagation();
    if (this.comment && !this.comment.isRetweeted) {
      this.retweet.emit(this.comment._id);
    }
  }
}
