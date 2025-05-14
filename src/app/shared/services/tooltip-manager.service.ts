// tooltip-manager.service.ts
import { Injectable } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class TooltipManagerService {
  private currentOverlayRef: OverlayRef | null = null;
  private closeTimeout: any;

  openTooltip(overlayRef: OverlayRef) {
    if (this.currentOverlayRef && this.currentOverlayRef !== overlayRef) {
      this.currentOverlayRef.detach();
    }

    this.currentOverlayRef = overlayRef;

    // Automatically clean up reference if overlay is detached externally
    overlayRef.detachments().subscribe(() => {
      if (this.currentOverlayRef === overlayRef) {
        this.currentOverlayRef = null;
      }
    });
  }

  closeCurrentTooltip(delayMs: number = 5 * 1000) {
    clearTimeout(this.closeTimeout);
    this.closeTimeout = setTimeout(() => {
      if (this.currentOverlayRef && this.currentOverlayRef.hasAttached()) {
        this.currentOverlayRef.detach();
      }
    }, delayMs);
  }
}
