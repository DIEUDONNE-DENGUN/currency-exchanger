import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-currency-historical-chart',
  templateUrl: './currency-historical-chart.component.html',
  styleUrls: ['./currency-historical-chart.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CurrencyHistoricalChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
