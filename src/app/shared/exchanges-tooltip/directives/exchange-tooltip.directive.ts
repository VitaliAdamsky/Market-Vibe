import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ExchangesTooltipComponent } from '../exchanges-tooltip.component';

@Directive({
  selector: '[appExchangeTooltip]',
})
export class ExchangeTooltipDirective {
  @Input('appExchangeTooltip') tooltipData!: {
    coinName: string;
    exchanges: string[]; // adjust this later if you have objects instead of strings
  };

  private overlayRef: OverlayRef | null = null;
  private closeTimeout: any;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  showTooltip() {
    clearTimeout(this.closeTimeout);

    if (!this.overlayRef) {
      const positionStrategy = this.overlayPositionBuilder
        .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
        ]);

      this.overlayRef = this.overlay.create({ positionStrategy });

      const tooltipPortal = new ComponentPortal(ExchangesTooltipComponent);
      const tooltipRef = this.overlayRef.attach(tooltipPortal);

      tooltipRef.instance.coinName = this.tooltipData.coinName;
      tooltipRef.instance.exchanges = this.tooltipData.exchanges;

      // Keep tooltip open when mouse enters tooltip content
      this.renderer.listen(
        tooltipRef.location.nativeElement,
        'mouseenter',
        () => {
          clearTimeout(this.closeTimeout);
        }
      );

      this.renderer.listen(
        tooltipRef.location.nativeElement,
        'mouseleave',
        () => {
          this.scheduleClose();
        }
      );
    }
  }

  @HostListener('mouseleave')
  scheduleClose() {
    this.closeTimeout = setTimeout(() => {
      if (this.overlayRef && this.overlayRef.hasAttached()) {
        this.overlayRef.detach();
        this.overlayRef = null;
      }
    }, 300); // Adjust this delay as needed (in ms)
  }

  ngOnDestroy() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
    clearTimeout(this.closeTimeout);
  }
}
