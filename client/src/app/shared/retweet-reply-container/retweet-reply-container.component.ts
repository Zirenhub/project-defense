import { Component, Input } from '@angular/core';
import { Reply } from 'src/app/types/Reply';

@Component({
  selector: 'app-retweet-reply-container',
  templateUrl: './retweet-reply-container.component.html',
})
export class RetweetReplyContainerComponent {
  @Input() comment?: Reply;
}
