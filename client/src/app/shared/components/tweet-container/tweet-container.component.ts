import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';

@Component({
  selector: 'app-tweet-container',
  templateUrl: './tweet-container.component.html',
})
export class TweetContainerComponent {
  @Input() tweet: Tweet | null = null;
  @Output() like = new EventEmitter();
  @Output() reply = new EventEmitter();
  @Output() retweet = new EventEmitter();

  constructor(private router: Router) {}

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

  navigateToProfile($event: Event) {
    $event.stopPropagation();
    this.router.navigateByUrl(`/profile/${this.tweet?.profile._id}`);
  }

  handleLike($event: Event) {
    $event.stopPropagation();
    if (this.tweet) {
      this.like.emit();
    }
  }

  handleReply($event: Event) {
    $event.stopPropagation();
    if (this.tweet) {
      this.reply.emit();
    }
  }

  handleRetweet($event: Event) {
    $event.stopPropagation();
    if (this.tweet && !this.tweet.isRetweeted) {
      this.retweet.emit();
    }
  }
}
