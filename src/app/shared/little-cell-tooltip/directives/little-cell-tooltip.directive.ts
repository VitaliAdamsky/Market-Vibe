import {
  OverlayRef,
  Overlay,
  OverlayPositionBuilder,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Directive,
  OnDestroy,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';
import { TableMetricItem } from '../../models/table-metrics';
import { TooltipManagerService } from '../../services/tooltip-manager.service';
import { LittleCellTooltipComponent } from '../little-cell-tooltip.component';
import { TooltipSyncService } from '../../services/tooltip-sync.service';

@Directive({
  selector: '[appLittleCellTooltip]',
})
export class LittleCellTooltipDirective implements OnDestroy {
  @Input('appLittleCellTooltip') data: TableMetricItem | null = null;

  private overlayRef: OverlayRef | null = null;
  private showTimeout: any;
  private closeTimeout: any;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private tooltipSyncService: TooltipSyncService
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.showTimeout = setTimeout(() => {
      const isClickTooltipOpen = this.tooltipSyncService.isClickTooltipOpen;
      const sameElement =
        this.tooltipSyncService.clickTooltipElement ===
        this.elementRef.nativeElement;

      if (isClickTooltipOpen && sameElement) return; // Don't show on same element

      this.showTooltip();
    }, 1000); // Delay
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    clearTimeout(this.showTimeout); // Cancel show if leaving early
    this.closeTooltip(); // Close immediately
  }

  private showTooltip() {
    if (!this.overlayRef) {
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

      const tooltipPortal = new ComponentPortal(LittleCellTooltipComponent);
      const tooltipRef = this.overlayRef.attach(tooltipPortal);
      tooltipRef.instance.data = this.data as any;

      tooltipRef.onDestroy(() => {
        this.overlayRef = null;
      });

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
          this.closeTooltip();
        }
      );
    }
  }

  private closeTooltip() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }

  ngOnDestroy() {
    this.closeTooltip();
    clearTimeout(this.showTimeout);
    clearTimeout(this.closeTimeout);
  }
}
