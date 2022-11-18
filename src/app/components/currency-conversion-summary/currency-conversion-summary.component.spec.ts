import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConversionSummaryComponent } from './currency-conversion-summary.component';

describe('CurrencyConversionSummaryComponent', () => {
  let component: CurrencyConversionSummaryComponent;
  let fixture: ComponentFixture<CurrencyConversionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyConversionSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConversionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
