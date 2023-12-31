import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetComponent } from './tweet.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TweetComponent],
  imports: [CommonModule, SharedModule],
})
export class TweetModule {}
