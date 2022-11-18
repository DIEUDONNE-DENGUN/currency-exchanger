import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyTitleBarComponent } from './currency-title-bar.component';

describe('CurrencyTitleBarComponent', () => {
  let component: CurrencyTitleBarComponent;
  let fixture: ComponentFixture<CurrencyTitleBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyTitleBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyTitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
