import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlineComponent } from './kline.component';

describe('KlineComponent', () => {
  let component: KlineComponent;
  let fixture: ComponentFixture<KlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KlineComponent]
    });
    fixture = TestBed.createComponent(KlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
