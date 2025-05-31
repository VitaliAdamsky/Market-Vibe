import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinMetricsComponent } from './coin-metrics.component';

describe('CoinMetricsComponent', () => {
  let component: CoinMetricsComponent;
  let fixture: ComponentFixture<CoinMetricsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoinMetricsComponent]
    });
    fixture = TestBed.createComponent(CoinMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
