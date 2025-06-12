import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentHeatmapComponent } from './sentiment-heatmap.component';

describe('SentimentHeatmapComponent', () => {
  let component: SentimentHeatmapComponent;
  let fixture: ComponentFixture<SentimentHeatmapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SentimentHeatmapComponent]
    });
    fixture = TestBed.createComponent(SentimentHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
