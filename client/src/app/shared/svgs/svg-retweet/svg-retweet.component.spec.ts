import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgRetweetComponent } from './svg-retweet.component';

describe('SvgRetweetComponent', () => {
  let component: SvgRetweetComponent;
  let fixture: ComponentFixture<SvgRetweetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SvgRetweetComponent]
    });
    fixture = TestBed.createComponent(SvgRetweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
