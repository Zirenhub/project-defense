import { Component, Input } from '@angular/core';
import { Tweet } from 'src/app/types/Tweet';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
})
export class TweetComponent {
  @Input() tweet: Tweet | null = null;
}
