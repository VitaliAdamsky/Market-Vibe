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
import { CellTooltipComponent } from '../cell-tooltip.component';
import { FundingRateItem } from '../../models/fr';
import { OpentInterestItem } from '../../models/oi';
import { TableMetricItem } from '../../models/table-metrics';

@Directive({
  selector: '[appCellTooltip]',
})
export class CellTooltipDirective implements OnDestroy {
  @Input('appCellTooltip') data: TableMetricItem | null = null;

  private overlayRef: OverlayRef | null = null;
  private isOpen = false;

  constructor(
    private elementRef: ElementRef,
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private renderer: Renderer2
  ) {}

  @HostListener('click')
  toggleTooltip() {
    if (this.isOpen) {
      this.closeTooltip();
    } else {
      this.openTooltip();
    }
    this.isOpen = !this.isOpen;
  }

  private openTooltip() {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
        },
      ]);

    this.overlayRef = this.overlay.create({ positionStrategy });

    const tooltipPortal = new ComponentPortal(CellTooltipComponent);
    const componentRef = this.overlayRef.attach(tooltipPortal);

    componentRef.instance.data = this.data as any;

    // Close on backdrop click
    this.overlayRef.backdropClick().subscribe(() => this.closeTooltip());

    // Close when the tooltip component requests it
    componentRef.instance.close.subscribe(() => this.closeTooltip());
  }

  private closeTooltip() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.overlayRef = null;
      this.isOpen = false;
    }
  }

  ngOnDestroy() {
    this.closeTooltip();
  }
}
