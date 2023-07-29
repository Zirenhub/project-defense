import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingSidebarComponent } from './trending-sidebar.component';

describe('TrendingSidebarComponent', () => {
  let component: TrendingSidebarComponent;
  let fixture: ComponentFixture<TrendingSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrendingSidebarComponent]
    });
    fixture = TestBed.createComponent(TrendingSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
