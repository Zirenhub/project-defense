import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { SvgReplyComponent } from './svgs/svg-reply/svg-reply.component';
import { SvgRetweetComponent } from './svgs/svg-retweet/svg-retweet.component';
import { SvgLikeComponent } from './svgs/svg-like/svg-like.component';
import { TweetContainerComponent } from './tweet-container/tweet-container.component';
import { ReplyContainerComponent } from './reply-container/reply-container.component';
import { OpenTweetContainerComponent } from './open-tweet-container/open-tweet-container.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ValidationErrorComponent,
    PopUpComponent,
    SvgReplyComponent,
    SvgRetweetComponent,
    SvgLikeComponent,
    TweetContainerComponent,
    ReplyContainerComponent,
    OpenTweetContainerComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    ValidationErrorComponent,
    PopUpComponent,
    SvgReplyComponent,
    SvgRetweetComponent,
    SvgLikeComponent,
    TweetContainerComponent,
    ReplyContainerComponent,
    OpenTweetContainerComponent,
  ],
})
export class SharedModule {}
