import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-currency-title-bar',
  templateUrl: './currency-title-bar.component.html',
  styleUrls: ['./currency-title-bar.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CurrencyTitleBarComponent implements OnInit {
  @Input() toolBarTitle: string | undefined;
  @Input() isDetailsPage: boolean | undefined;
  @Output() returnToHomePageEvent = new EventEmitter<boolean>(false);

  constructor() {
  }

  ngOnInit(): void {
  }

  returnToHome() {
    this.returnToHomePageEvent.emit(true);
  }
}
