import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplyComponent } from './reply/reply.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ReplyComponent],
  imports: [CommonModule, SharedModule],
})
export class ReplyModule {}
