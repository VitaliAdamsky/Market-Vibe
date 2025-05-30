import { Component, Input } from '@angular/core';
import { ChartResult } from 'src/app/shared/models/chart-result';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  @Input() chartData!: ChartResult;
}
