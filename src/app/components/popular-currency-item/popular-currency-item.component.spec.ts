import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCurrencyItemComponent } from './popular-currency-item.component';

describe('PopularCurrencyItemComponent', () => {
  let component: PopularCurrencyItemComponent;
  let fixture: ComponentFixture<PopularCurrencyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularCurrencyItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularCurrencyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
