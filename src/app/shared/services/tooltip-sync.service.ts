import { OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TooltipSyncService {
  isClickTooltipOpen = false;
  clickTooltipElement: HTMLElement | null = null;

  private activeHoverTooltip: OverlayRef | null = null;

  openTooltip(overlayRef: OverlayRef) {
    this.closeCurrentTooltip();
    this.activeHoverTooltip = overlayRef;
  }

  closeCurrentTooltip() {
    if (this.activeHoverTooltip) {
      this.activeHoverTooltip.detach();
      this.activeHoverTooltip = null;
    }
  }

  setClickTooltipElement(el: HTMLElement | null) {
    this.clickTooltipElement = el;
    this.isClickTooltipOpen = !!el;
  }
}
