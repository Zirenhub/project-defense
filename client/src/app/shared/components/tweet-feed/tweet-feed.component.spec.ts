import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetFeedComponent } from './tweet-feed.component';

describe('TweetFeedComponent', () => {
  let component: TweetFeedComponent;
  let fixture: ComponentFixture<TweetFeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TweetFeedComponent]
    });
    fixture = TestBed.createComponent(TweetFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
