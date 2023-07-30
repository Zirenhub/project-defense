import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgLikeComponent } from './svg-like.component';

describe('SvgLikeComponent', () => {
  let component: SvgLikeComponent;
  let fixture: ComponentFixture<SvgLikeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SvgLikeComponent]
    });
    fixture = TestBed.createComponent(SvgLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
