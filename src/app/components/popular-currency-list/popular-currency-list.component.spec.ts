import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCurrencyListComponent } from './popular-currency-list.component';

describe('PopularCurrencyListComponent', () => {
  let component: PopularCurrencyListComponent;
  let fixture: ComponentFixture<PopularCurrencyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularCurrencyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularCurrencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
