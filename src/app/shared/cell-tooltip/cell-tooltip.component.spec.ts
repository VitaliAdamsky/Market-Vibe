import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellTooltipComponent } from './cell-tooltip.component';

describe('CellTooltipComponent', () => {
  let component: CellTooltipComponent;
  let fixture: ComponentFixture<CellTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CellTooltipComponent]
    });
    fixture = TestBed.createComponent(CellTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
