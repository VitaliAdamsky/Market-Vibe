import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataChartsComponent } from './data-charts.component';

describe('DataChartsComponent', () => {
  let component: DataChartsComponent;
  let fixture: ComponentFixture<DataChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataChartsComponent]
    });
    fixture = TestBed.createComponent(DataChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
