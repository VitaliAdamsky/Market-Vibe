import {
  Component,
  Input,
  AfterViewInit,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css'],
})
export class ScrollToTopComponent implements AfterViewInit, OnDestroy {
  isVisible = false;

  @Input() scrollOffset = 200;
  @Input() position: 'right' | 'left' = 'right';
  @Input() tableContainer?: HTMLElement;

  private tableScrollUnlistener?: () => void;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Listen to window scroll
    this.renderer.listen('window', 'scroll', () => this.updateVisibility());

    // Listen to table scroll if available
    if (this.tableContainer) {
      this.tableScrollUnlistener = this.renderer.listen(
        this.tableContainer,
        'scroll',
        () => this.updateVisibility()
      );
    }

    // Initial visibility check
    this.updateVisibility();
  }

  ngOnDestroy(): void {
    // Remove table scroll listener if it was added
    if (this.tableScrollUnlistener) {
      this.tableScrollUnlistener();
    }
  }

  private updateVisibility(): void {
    const windowScrolled = window.pageYOffset > this.scrollOffset;
    const tableScrolled =
      this.tableContainer?.scrollTop &&
      this.tableContainer.scrollTop > this.scrollOffset;

    this.isVisible = windowScrolled || !!tableScrolled;
  }

  scrollToTop(): void {
    if (window.pageYOffset > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (this.tableContainer && this.tableContainer.scrollTop > 0) {
      this.tableContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
