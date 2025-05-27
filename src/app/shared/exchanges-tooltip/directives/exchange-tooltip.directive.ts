import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  OnDestroy,
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
export class ExchangeTooltipDirective implements OnDestroy {
  @Input('appExchangeTooltip') tooltipData!: {
    symbol: string;
    exchanges: string[];
  };

  @Input() triggerEvent: 'hover' | 'click' = 'hover';

  private overlayRef: OverlayRef | null = null;
  private closeTimeout: any;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private tooltipManager: TooltipManagerService
  ) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.triggerEvent === 'click') {
      this.toggleTooltip(event);
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.triggerEvent === 'hover') {
      this.showTooltip();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.triggerEvent === 'hover') {
      this.scheduleClose();
    }
  }

  private toggleTooltip(event: MouseEvent) {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.overlayRef = null;
    } else {
      this.showTooltipAtCursor(event);
    }
  }

  private showTooltipAtCursor(event: MouseEvent) {
    this.tooltipManager.closeCurrentTooltip();

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x: event.clientX, y: event.clientY })
      .withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8,
        },
      ])
      .withPush(false);

    this.overlayRef = this.overlay.create({ positionStrategy });

    const tooltipPortal = new ComponentPortal(ExchangesTooltipComponent);
    const tooltipRef = this.overlayRef.attach(tooltipPortal);

    tooltipRef.instance.symbol = this.tooltipData.symbol;
    tooltipRef.instance.exchanges = this.tooltipData.exchanges;

    this.tooltipManager.openTooltip(this.overlayRef);

    tooltipRef.onDestroy(() => {
      this.overlayRef = null;
    });
  }

  private showTooltip() {
    clearTimeout(this.closeTimeout);
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

      tooltipRef.instance.symbol = this.tooltipData.symbol;
      tooltipRef.instance.exchanges = this.tooltipData.exchanges;

      this.tooltipManager.openTooltip(this.overlayRef);

      tooltipRef.onDestroy(() => {
        this.overlayRef = null;
      });

      this.renderer.listen(
        tooltipRef.location.nativeElement,
        'mouseenter',
        () => clearTimeout(this.closeTimeout)
      );

      this.renderer.listen(
        tooltipRef.location.nativeElement,
        'mouseleave',
        () => this.scheduleClose()
      );
    }
  }

  private scheduleClose() {
    this.closeTimeout = setTimeout(() => {
      if (this.overlayRef && this.overlayRef.hasAttached()) {
        this.overlayRef.detach();
        this.overlayRef = null;
      }
    }, 300);
  }

  ngOnDestroy() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
    clearTimeout(this.closeTimeout);
  }
}
