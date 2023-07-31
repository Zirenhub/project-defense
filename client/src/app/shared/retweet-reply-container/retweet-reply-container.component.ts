import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Reply } from 'src/app/types/Reply';

@Component({
  selector: 'app-retweet-reply-container',
  templateUrl: './retweet-reply-container.component.html',
})
export class RetweetReplyContainerComponent {
  @Input() comment?: Reply;

  constructor(private router: Router) {}

  navigate() {
    if (this.comment) {
      this.router.navigate([`/reply/${this.comment._id}`]);
    }
  }
}
