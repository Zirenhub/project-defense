import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reply } from 'src/app/types/Reply';
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

  get retweetReply() {
    if (
      this.tweet?.retweet.original &&
      this.tweet.retweet.originalModel === 'Comment'
    ) {
      return this.tweet.retweet.original as Reply;
    }
    return null;
  }

  get retweetTweet() {
    if (
      this.tweet?.retweet.original &&
      this.tweet.retweet.originalModel === 'Tweet'
    ) {
      return this.tweet.retweet.original as Tweet;
    }
    return null;
  }

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
    if (this.tweet && !this.tweet.isRetweeted) {
      this.retweet.emit(this.tweet._id);
    }
  }
}
