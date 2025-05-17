import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LittleCellTooltipComponent } from './little-cell-tooltip.component';

describe('LittleCellTooltipComponent', () => {
  let component: LittleCellTooltipComponent;
  let fixture: ComponentFixture<LittleCellTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LittleCellTooltipComponent]
    });
    fixture = TestBed.createComponent(LittleCellTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
