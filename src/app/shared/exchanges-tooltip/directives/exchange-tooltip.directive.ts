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
import { TooltipManagerService } from '../../services/tooltip-manager.service';

@Directive({
  selector: '[appExchangeTooltip]',
})
export class ExchangeTooltipDirective {
  @Input('appExchangeTooltip') tooltipData!: {
    symbol: string;
    exchanges: string[];
  };

  private overlayRef: OverlayRef | null = null;
  private closeTimeout: any;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private tooltipManager: TooltipManagerService
  ) {}

  @HostListener('mouseenter')
  showTooltip() {
    clearTimeout(this.closeTimeout);

    // Close any previously opened tooltip before opening new one
    this.tooltipManager.closeCurrentTooltip();

    if (!this.overlayRef) {
      const positionStrategy = this.overlayPositionBuilder
        .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top',
          },
        ]);

      this.overlayRef = this.overlay.create({ positionStrategy });

      const tooltipPortal = new ComponentPortal(ExchangesTooltipComponent);
      const tooltipRef = this.overlayRef.attach(tooltipPortal);

      // Pass data to tooltip component
      tooltipRef.instance.symbol = this.tooltipData.symbol;
      tooltipRef.instance.exchanges = this.tooltipData.exchanges;

      // Notify manager about new tooltip
      this.tooltipManager.openTooltip(this.overlayRef);

      // Clear local overlayRef when tooltip is destroyed
      tooltipRef.onDestroy(() => {
        this.overlayRef = null;
      });

      // Keep tooltip open while hovering over it
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
    }, 300); // Adjust delay as needed
  }

  ngOnDestroy() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
    clearTimeout(this.closeTimeout);
  }
}
