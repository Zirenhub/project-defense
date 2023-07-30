import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tweet } from 'src/app/types/Tweet';

@Component({
  selector: 'app-tweet-container',
  templateUrl: './tweet-container.component.html',
})
export class TweetContainerComponent {
  @Input() tweet: Tweet | null = null;
  @Output() like = new EventEmitter<string>();
  @Output() reply = new EventEmitter<string>();
  @Output() retweet = new EventEmitter<string>();

  handleLike($event: Event) {
    $event.stopPropagation();
    if (this.tweet) {
      this.like.emit(this.tweet._id);
    }
  }

  handleReply($event: Event) {
    $event.stopPropagation();
    if (this.tweet) {
      this.reply.emit(this.tweet._id);
    }
  }

  handleRetweet($event: Event) {
    $event.stopPropagation();
  }
}
