import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetweetReplyContainerComponent } from './retweet-reply-container.component';

describe('RetweetReplyContainerComponent', () => {
  let component: RetweetReplyContainerComponent;
  let fixture: ComponentFixture<RetweetReplyContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetweetReplyContainerComponent]
    });
    fixture = TestBed.createComponent(RetweetReplyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
