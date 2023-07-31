import { Location } from '@angular/common';
import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import {
  profile,
  profileLikes,
  profileTweets,
} from 'src/app/state/profile/profile.actions';
import {
  selectGetProfile,
  selectProfileLikes,
  selectProfileTweets,
} from 'src/app/state/profile/profile.selectors';
import {
  closeReplyingToModal,
  likeReply,
  likeTweet,
  openReplyModal,
} from 'src/app/state/tweets/tweet.actions';
import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';
import { User } from 'src/app/types/User';

type Pages = 'Tweets' | 'Replies' | 'Media' | 'Likes';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  private routeSub?: Subscription;
  profileId?: string;

  profile$: Observable<User | null>;
  tweets$: Observable<Tweet[]>;
  likes$: Observable<(Tweet | Reply)[]>;

  activePage: Pages = 'Tweets';

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location,
    private router: Router
  ) {
    this.tweets$ = this.store.select(selectProfileTweets);
    this.profile$ = this.store.select(selectGetProfile);
    this.likes$ = this.store.select(selectProfileLikes);
  }

  navigateBack() {
    this.location.back();
  }

  navigateToLike(like: Tweet | Reply) {
    // almost out of time, will have to do for now.
    this.router.navigate(['parent' in like ? '/reply' : '/tweet', like._id]);
  }

  buttons: { name: Pages }[] = [
    { name: 'Tweets' },
    { name: 'Replies' },
    { name: 'Media' },
    { name: 'Likes' },
  ];

  switch(name: Pages) {
    this.activePage = name;
    this.handleActivePageChange(name);
  }

  private handleActivePageChange(newActivePage: Pages) {
    if (newActivePage === 'Tweets') {
      this.getProfileTweets();
    } else if (newActivePage === 'Replies') {
      // Handle Replies page
    } else if (newActivePage === 'Media') {
      // Handle Media page
    } else if (newActivePage === 'Likes') {
      this.getProfileLikes();
    }
  }

  handleLike(like: Tweet | Reply) {
    // if ('parent' in like) {
    //   this.store.dispatch(likeReply({ id: like._id }));
    // } else {
    //   this.store.dispatch(likeTweet({ id: like._id }));
    // }
  }
  handleReply(like: Tweet | Reply) {
    // this.store.dispatch(
    //   openReplyModal({
    //     context: 'parent' in like ? 'reply' : 'tweet',
    //     id: like._id,
    //   })
    // );
  }
  handleRetweet(like: Tweet | Reply) {}

  getProfileTweets() {
    if (this.profileId) {
      this.store.dispatch(profileTweets({ id: this.profileId }));
    }
  }

  getProfileLikes() {
    if (this.profileId) {
      this.store.dispatch(profileLikes({ id: this.profileId }));
    }
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.profileId = params['id'] as string;
      if (this.profileId) {
        this.store.dispatch(profile({ id: this.profileId }));
        this.handleActivePageChange(this.activePage);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
