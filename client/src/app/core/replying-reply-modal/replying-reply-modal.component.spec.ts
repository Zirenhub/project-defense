import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyingReplyModalComponent } from './replying-reply-modal.component';

describe('ReplyingReplyModalComponent', () => {
  let component: ReplyingReplyModalComponent;
  let fixture: ComponentFixture<ReplyingReplyModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplyingReplyModalComponent]
    });
    fixture = TestBed.createComponent(ReplyingReplyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
