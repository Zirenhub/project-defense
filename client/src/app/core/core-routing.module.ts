import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { FeedComponent } from '../home/feed/feed.component';
import { TweetComponent } from '../tweet/tweet.component';
import { ReplyComponent } from '../reply/reply/reply.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: FeedComponent },
      { path: 'tweet/:id', component: TweetComponent },
      { path: 'reply/:id', component: ReplyComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
