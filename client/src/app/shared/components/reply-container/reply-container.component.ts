import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';

@Component({
  selector: 'app-reply-container',
  templateUrl: './reply-container.component.html',
})
export class ReplyContainerComponent {
  // fix this later
  @Input() comment: Tweet | Reply | null = null;
  @Output() like = new EventEmitter<string>();
  @Output() reply = new EventEmitter<string>();
  @Output() retweet = new EventEmitter<string>();

  constructor(private router: Router) {}

  handleLike($event: Event) {
    $event.stopPropagation();
    if (this.comment) {
      this.like.emit(this.comment._id);
    }
  }

  navigateToProfile($event: Event) {
    $event.stopPropagation();
    this.router.navigateByUrl(`/profile/${this.comment?.profile._id}`);
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
