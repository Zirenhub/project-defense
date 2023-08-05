import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTweetContainerComponent } from './open-tweet-container.component';

describe('OpenTweetContainerComponent', () => {
  let component: OpenTweetContainerComponent;
  let fixture: ComponentFixture<OpenTweetContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenTweetContainerComponent]
    });
    fixture = TestBed.createComponent(OpenTweetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
