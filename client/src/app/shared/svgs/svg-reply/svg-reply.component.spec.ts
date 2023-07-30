import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgReplyComponent } from './svg-reply.component';

describe('SvgReplyComponent', () => {
  let component: SvgReplyComponent;
  let fixture: ComponentFixture<SvgReplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SvgReplyComponent]
    });
    fixture = TestBed.createComponent(SvgReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
