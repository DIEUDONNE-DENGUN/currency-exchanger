import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConverterContainerComponent } from './currency-converter-container.component';

describe('CurrencyConverterContainerComponent', () => {
  let component: CurrencyConverterContainerComponent;
  let fixture: ComponentFixture<CurrencyConverterContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyConverterContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConverterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
