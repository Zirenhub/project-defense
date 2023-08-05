import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { SvgReplyComponent } from './svgs/svg-reply/svg-reply.component';
import { SvgRetweetComponent } from './svgs/svg-retweet/svg-retweet.component';
import { SvgLikeComponent } from './svgs/svg-like/svg-like.component';
import { TweetContainerComponent } from './components/tweet-container/tweet-container.component';
import { ReplyContainerComponent } from './components/reply-container/reply-container.component';
import { OpenTweetContainerComponent } from './components/open-tweet-container/open-tweet-container.component';
import { FormsModule } from '@angular/forms';
import { RetweetReplyContainerComponent } from './components/retweet-reply-container/retweet-reply-container.component';
import { RetweetTweetContainerComponent } from './components/retweet-tweet-container/retweet-tweet-container.component';
import { TweetFeedComponent } from './components/tweet-feed/tweet-feed.component';

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
    RetweetReplyContainerComponent,
    RetweetTweetContainerComponent,
    TweetFeedComponent,
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
    RetweetReplyContainerComponent,
    RetweetTweetContainerComponent,
    TweetFeedComponent,
  ],
})
export class SharedModule {}
