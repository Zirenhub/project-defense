import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authReducer } from './state/auth/auth.reducer';
import { AuthService } from './auth.service';
import { appInterceptorProvider } from './app-interceptor';
import { AuthEffects } from './state/auth/auth.effects';
import { SharedModule } from './shared/shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthGuard } from './shared/guards/auth.guard';
import { tweetReducer } from './state/tweets/tweet.reducer';
import { TweetService } from './state/tweets/tweet.service';
import { TweetEffects } from './state/tweets/tweet.effects';
import { HomeModule } from './home/home.module';
import { TweetModule } from './tweet/tweet.module';
import { ReplyModule } from './reply/reply.module';
import { profileReducer } from './state/profile/profile.reducer';
import { ProfileEffects } from './state/profile/profile.effects';
import { ProfileService } from './state/profile/profile.service';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    HomeModule,
    TweetModule,
    ReplyModule,
    ProfileModule,
    StoreModule.forRoot({
      auth: authReducer,
      tweets: tweetReducer,
      profile: profileReducer,
    }),
    EffectsModule.forRoot([AuthEffects, TweetEffects, ProfileEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    AuthService,
    TweetService,
    ProfileService,
    appInterceptorProvider,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
