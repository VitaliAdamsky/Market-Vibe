import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';
import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CellTooltipComponent } from '../cell-tooltip.component';
import { TableMetricItem } from '../../models/table-metrics';
import { TooltipSyncService } from '../../services/tooltip-sync.service';

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
    private tooltipSyncService: TooltipSyncService
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
    this.tooltipSyncService.setClickTooltipElement(
      this.elementRef.nativeElement,
      this.data?.symbol || null
    );
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
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
    this.tooltipSyncService.setClickTooltipElement(null);
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
