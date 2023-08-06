import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyingTweetModalComponent } from './replying-tweet-modal.component';

describe('ReplyingTweetModalComponent', () => {
  let component: ReplyingTweetModalComponent;
  let fixture: ComponentFixture<ReplyingTweetModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplyingTweetModalComponent]
    });
    fixture = TestBed.createComponent(ReplyingTweetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
