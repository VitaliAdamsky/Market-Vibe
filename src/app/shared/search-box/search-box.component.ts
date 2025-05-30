import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  @Input() placeholder: string = 'Search...';
  @Input() query: string = '';
  @Output() queryChange = new EventEmitter<string>();

  onInput(value: string) {
    this.queryChange.emit(value);
  }

  clear() {
    this.query = '';
    this.queryChange.emit(this.query);
  }
}
