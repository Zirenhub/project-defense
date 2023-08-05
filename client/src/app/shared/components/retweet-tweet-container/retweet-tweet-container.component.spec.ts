import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetweetTweetContainerComponent } from './retweet-tweet-container.component';

describe('RetweetTweetContainerComponent', () => {
  let component: RetweetTweetContainerComponent;
  let fixture: ComponentFixture<RetweetTweetContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetweetTweetContainerComponent]
    });
    fixture = TestBed.createComponent(RetweetTweetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
