import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingRateComponent } from './funding-rate.component';

describe('FundingRateComponent', () => {
  let component: FundingRateComponent;
  let fixture: ComponentFixture<FundingRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundingRateComponent]
    });
    fixture = TestBed.createComponent(FundingRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
