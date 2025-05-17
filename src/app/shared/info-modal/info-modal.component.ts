import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HtmlContentService } from '../services/html-content.service';
import { Observable } from 'rxjs';
import { Metric } from '../models/metric';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css'],
})
export class InfoModalComponent {
  htmlContent$!: Observable<string>;
  text: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Metric,
    private htmlContentService: HtmlContentService
  ) {
    this.htmlContent$ = this.htmlContentService.getHtmlContent(data.dataUrl);
  }
}
