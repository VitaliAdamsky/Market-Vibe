import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangesTooltipComponent } from './exchanges-tooltip.component';

describe('ExchangesTooltipComponent', () => {
  let component: ExchangesTooltipComponent;
  let fixture: ComponentFixture<ExchangesTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangesTooltipComponent]
    });
    fixture = TestBed.createComponent(ExchangesTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
