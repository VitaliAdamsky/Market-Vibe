import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketActivityComponent } from './market-activity.component';

describe('MarketActivityComponent', () => {
  let component: MarketActivityComponent;
  let fixture: ComponentFixture<MarketActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketActivityComponent]
    });
    fixture = TestBed.createComponent(MarketActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
