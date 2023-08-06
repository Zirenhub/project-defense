import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FeedComponent],
  imports: [CommonModule, SharedModule, FormsModule],
  exports: [FeedComponent],
})
export class HomeModule {}
