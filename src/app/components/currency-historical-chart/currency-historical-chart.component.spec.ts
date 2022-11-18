import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyHistoricalChartComponent } from './currency-historical-chart.component';

describe('CurrencyHistoricalChartComponent', () => {
  let component: CurrencyHistoricalChartComponent;
  let fixture: ComponentFixture<CurrencyHistoricalChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyHistoricalChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyHistoricalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
