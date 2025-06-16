import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketAnalyzerComponent } from './market-analyzer.component';

describe('MarketAnalyzerComponent', () => {
  let component: MarketAnalyzerComponent;
  let fixture: ComponentFixture<MarketAnalyzerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketAnalyzerComponent]
    });
    fixture = TestBed.createComponent(MarketAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
