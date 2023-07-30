import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { TweetComponent } from './tweet/tweet.component';
import { SvgReplyComponent } from './svgs/svg-reply/svg-reply.component';
import { SvgRetweetComponent } from './svgs/svg-retweet/svg-retweet.component';
import { SvgLikeComponent } from './svgs/svg-like/svg-like.component';

@NgModule({
  declarations: [
    ValidationErrorComponent,
    PopUpComponent,
    TweetComponent,
    SvgReplyComponent,
    SvgRetweetComponent,
    SvgLikeComponent,
  ],
  imports: [CommonModule],
  exports: [
    ValidationErrorComponent,
    PopUpComponent,
    TweetComponent,
    SvgReplyComponent,
    SvgRetweetComponent,
    SvgLikeComponent,
  ],
})
export class SharedModule {}
