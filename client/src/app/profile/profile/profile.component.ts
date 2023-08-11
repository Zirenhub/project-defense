import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import * as profileActions from 'src/app/state/profile/profile.actions';
import * as sharedActions from 'src/app/state/shared/shared.actions';
import * as modalActions from '../../state/modal/modal.actions';
import * as profileSelectors from 'src/app/state/profile/profile.selectors';
import * as authSelectors from '../../state/auth/auth.selectors';
import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';
import { User } from 'src/app/types/User';

type Pages = 'Tweets' | 'Replies' | 'Media' | 'Likes';
type button = { name: Pages; init: () => void };

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  private routeSub?: Subscription;
  private authSub: Subscription;
  private profileSub: Subscription;

  profileId?: string;
  context: sharedActions.sharedContext = sharedActions.sharedContext.Profile;

  profile$: Observable<User | null>;
  tweets$: Observable<Tweet[]>;
  likes$: Observable<(Tweet | Reply)[]>;
  authUser$: Observable<User | null>;

  profile: User | null = null;
  authUser: User | null = null;
  // save this on profile state ???
  isFollowing: boolean = true;
  activePage: Pages = 'Tweets';

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location,
    private router: Router
  ) {
    this.tweets$ = this.store.select(profileSelectors.selectProfileTweets);
    this.profile$ = this.store.select(profileSelectors.selectGetProfile);
    this.likes$ = this.store.select(profileSelectors.selectProfileLikes);
    this.authUser$ = this.store.select(authSelectors.selectAuthUser);

    this.authSub = this.authUser$.subscribe((user) => {
      this.authUser = user;
    });
    this.profileSub = this.profile$.subscribe((profile) => {
      this.profile = profile;
      this.getIsFollowing();
    });
  }

  navigateBack() {
    this.location.back();
  }

  navigateToLiked(like: Tweet | Reply) {
    this.router.navigate(['parent' in like ? '/reply' : '/tweet', like._id]);
  }

  buttons: button[] = [
    {
      name: 'Tweets',
      init: () => {
        if (this.profileId) {
          this.store.dispatch(
            profileActions.profileTweets({ id: this.profileId })
          );
        }
      },
    },
    { name: 'Replies', init: () => {} },
    { name: 'Media', init: () => {} },
    {
      name: 'Likes',
      init: () => {
        if (this.profileId) {
          this.store.dispatch(
            profileActions.profileLikes({ id: this.profileId })
          );
        }
      },
    },
  ];

  switch(button: button) {
    this.activePage = button.name;
    button.init();
  }

  handleLike(like: Tweet | Reply) {
    if ('parent' in like) {
      this.store.dispatch(
        sharedActions.likeReply({ id: like._id, context: this.context })
      );
    } else {
      this.store.dispatch(
        sharedActions.likeTweet({ id: like._id, context: this.context })
      );
    }
  }

  handleReply(like: Tweet | Reply) {
    if ('parent' in like) {
      this.store.dispatch(
        modalActions.openReplyingToReplyModal({
          reply: like,
          context: this.context,
        })
      );
    } else {
      this.store.dispatch(
        modalActions.openReplyingToTweetModal({
          tweet: like,
          context: this.context,
        })
      );
    }
  }

  handleRetweet(like: Tweet | Reply) {
    this.store.dispatch(
      modalActions.openRetweetModal({
        content: like,
        context: this.context,
      })
    );
  }

  handleFollow() {
    if (this.profile) {
      if (this.isFollowing) {
        this.store.dispatch(profileActions.unfollow({ id: this.profile._id }));
      } else {
        this.store.dispatch(profileActions.follow({ id: this.profile._id }));
      }
      // update only if follow or unfollow is successful??
      this.isFollowing = !this.isFollowing;
    }
  }

  private getIsFollowing() {
    if (
      this.profile &&
      this.authUser &&
      this.profile.followers.includes(this.authUser._id)
    ) {
      this.isFollowing = true;
    } else {
      this.isFollowing = false;
    }
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.profileId = params['id'] as string;
      if (this.profileId) {
        this.store.dispatch(profileActions.profile({ id: this.profileId }));
        const init = this.buttons.find((x) => x.name === this.activePage);
        if (init) {
          init.init();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.profileSub.unsubscribe();
    this.authSub.unsubscribe();
  }
}
