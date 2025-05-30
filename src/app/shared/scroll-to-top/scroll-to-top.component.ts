import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css'],
})
export class ScrollToTopComponent {
  isVisible = false;

  @Input() scrollOffset = 200; // px before button appears
  @Input() position: 'right' | 'left' = 'right';

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isVisible = window.pageYOffset > this.scrollOffset;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
