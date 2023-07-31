import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/types/Tweet';

@Component({
  selector: 'app-retweet-tweet-container',
  templateUrl: './retweet-tweet-container.component.html',
})
export class RetweetTweetContainerComponent {
  @Input() tweet?: Tweet;

  constructor(private router: Router) {}

  navigate() {
    if (this.tweet) {
      this.router.navigate([`/tweet/${this.tweet._id}`]);
    }
  }
}
