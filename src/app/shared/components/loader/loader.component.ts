import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {
  @Input() loaderMessage: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
