import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
})
export class TweetComponent {
  @Input() tweet: Tweet | Reply | null = null;
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
  }

  handleRetweet($event: Event) {
    $event.stopPropagation();
  }
}
