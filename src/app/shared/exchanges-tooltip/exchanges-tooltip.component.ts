import { Component } from '@angular/core';

@Component({
  selector: 'app-exchanges-tooltip',
  templateUrl: './exchanges-tooltip.component.html',
  styleUrls: ['./exchanges-tooltip.component.css'],
})
export class ExchangesTooltipComponent {
  coinName: string = '';
  exchanges: string[] = [];
}
