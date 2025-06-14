import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorComponent } from './aggregator.component';

describe('AggregatorComponent', () => {
  let component: AggregatorComponent;
  let fixture: ComponentFixture<AggregatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AggregatorComponent]
    });
    fixture = TestBed.createComponent(AggregatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
