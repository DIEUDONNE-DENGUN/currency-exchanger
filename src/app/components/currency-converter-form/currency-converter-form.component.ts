import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ICurrency} from "../../models/currency.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-currency-converter-form',
  templateUrl: './currency-converter-form.component.html',
  styleUrls: ['./currency-converter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyConverterFormComponent implements OnInit {

  readonly defaultCurrencyPair = environment.baseCurrencyPair;
  @Input() currencies$: Observable<ICurrency[]> | undefined;
  @Input() isConvertingState: boolean | undefined;
  @Output() amountEnteredEvent = new EventEmitter<boolean>(false);
  @Output() convertCurrencyEvent = new EventEmitter<{}>();
  fromCurrency = new FormControl();
  toCurrency = new FormControl();
  amount = new FormControl();
  currencyFormGroup: FormGroup;
  hasEnteredAmount: boolean = true;

  constructor() {
    this.currencyFormGroup = new FormGroup({
      fromCurrency: new FormControl({
        value: this.defaultCurrencyPair.fromCurrencyCode,
        disabled: true
      }, Validators.required),
      toCurrency: new FormControl({
        value: this.defaultCurrencyPair.toCurrencyCode,
        disabled: true
      }, Validators.required),
      amount: new FormControl({value: 0}, Validators.required)
    });
  }

  ngOnInit(): void {
    this.handleAmountValueChanged();
  }

  handleAmountValueChanged() {
    //listen to amount form control value changed and enable the convert button if needed
    // @ts-ignore
    this.currencyFormGroup.get("amount").valueChanges.subscribe(amount => {
      if (amount > 0) {
        //enable convert button
        this.hasEnteredAmount = false;
        //enable the fromCurrency and toCurrency input field
        this.currencyFormGroup.get('fromCurrency')?.enable();
        this.currencyFormGroup.get('toCurrency')?.enable();
        this.amountEnteredEvent?.emit(true);
      } else {
        this.hasEnteredAmount = true;
        //disable input fields
        // fromCurrency and toCurrency input field
        this.currencyFormGroup.get('fromCurrency')?.disable();
        this.currencyFormGroup.get('toCurrency')?.disable();
        this.amountEnteredEvent?.emit(false);
      }
    })
  }

  swapCurrency() {
    //get the current value for the fromCurrency and toCurrency
    const fromCurrency = this.currencyFormGroup.get('fromCurrency')?.value;
    const toCurrency = this.currencyFormGroup.get('toCurrency')?.value;
    //swap the values if they are different
    if (fromCurrency !== toCurrency) {
      this.currencyFormGroup.get('fromCurrency')?.setValue(toCurrency);
      this.currencyFormGroup.get('toCurrency')?.setValue(fromCurrency);
    }
  }

  /**
   * convert a given amount of currency to another
   */
  handleConvertCurrencyAmountEvent() {
    //disable the convert button for the request to go through
    const amount = this.currencyFormGroup.get('amount')?.value;
    const fromCurrency = this.currencyFormGroup.get('fromCurrency')?.value;
    const toCurrency = this.currencyFormGroup.get("toCurrency")?.value;
    this.convertCurrencyEvent.emit({amount: amount, fromCurrency: fromCurrency, toCurrency: toCurrency});
  }
}
