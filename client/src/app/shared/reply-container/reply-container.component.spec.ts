import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyContainerComponent } from './reply-container.component';

describe('ReplyContainerComponent', () => {
  let component: ReplyContainerComponent;
  let fixture: ComponentFixture<ReplyContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplyContainerComponent]
    });
    fixture = TestBed.createComponent(ReplyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
