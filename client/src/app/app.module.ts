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
import { SharedService } from './state/shared/shared.service';
import { SharedEffects } from './state/shared/shared.effects';
import { HomeModule } from './home/home.module';
import { TweetModule } from './tweet/tweet.module';
import { ReplyModule } from './reply/reply.module';
import { profileReducer } from './state/profile/profile.reducer';
import { ProfileEffects } from './state/profile/profile.effects';
import { ProfileService } from './state/profile/profile.service';
import { ProfileModule } from './profile/profile.module';
import { singleReducer } from './state/single/single.reducer';
import { modalReducer } from './state/modal/modal.reducer';
import { replyReducer } from './state/reply/reply.reducer';
import { timelineReducer } from './state/timeline/timeline.reducer';

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
      modal: modalReducer,
      profile: profileReducer,
      reply: replyReducer,
      single: singleReducer,
      timeline: timelineReducer,
    }),
    EffectsModule.forRoot([AuthEffects, SharedEffects, ProfileEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    AuthService,
    SharedService,
    ProfileService,
    appInterceptorProvider,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
