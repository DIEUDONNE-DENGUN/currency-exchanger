import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {
  isAmountEntered: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  //send the data to header component to determine the enable status of its buttons
  handleAmountEnteringStatus($event: boolean) {
    this.isAmountEntered = $event;
  }
}
