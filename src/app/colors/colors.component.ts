import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Colors } from './models/colors';
import { ColorService } from './service/colors.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/services/snackbar.service';
import { SnackbarType } from '../models/shared/snackbar-type';

const DEFAULTS: Colors = {
  closePriceMin: '#90EE90',
  closePriceMax: '#006400',
  closePriceChangeMin: '#8B0000',
  closePriceChangeMax: '#006400',
  buyerRatioMin: '#90EE90',
  buyerRatioMax: '#006400',
  buyerRatioChangeMin: '#8B0000',
  buyerRatioChangeMax: '#006400',
  quoteVolumeMin: '#90EE90',
  quoteVolumeMax: '#006400',
  quoteVolumeChangeMin: '#8B0000',
  quoteVolumeChangeMax: '#006400',
  perpSpotDiffMin: '#90EE90',
  perpSpotDiffMax: '#006400',
  volumeDeltaMin: '#90EE90',
  volumeDeltaMax: '#006400',
  volumeDeltaChangeMin: '#8B0000',
  volumeDeltaChangeMax: '#006400',
  openInterestMin: '#90EE90',
  openInterestMax: '#006400',
  openInterestChangeMin: '#8B0000',
  openInterestChangeMax: '#006400',
  fundingRateMin: '#90EE90',
  fundingRateMax: '#006400',
  fundingRateChangeMin: '#8B0000',
  fundingRateChangeMax: '#006400',
};

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css'],
})
export class ColorsComponent implements OnDestroy {
  subscription: Subscription = new Subscription();
  colors: Colors | null = null;
  colorsForm!: FormGroup;
  colorKeys: string[] = [];
  isResetting = false;
  constructor(
    private fb: FormBuilder,
    private colorService: ColorService,
    private snackbarService: SnackbarService
  ) {
    this.subscription.add(
      this.colorService.getColors().subscribe((colors) => {
        this.colorKeys = Object.keys(colors);
        this.colorsForm = this.fb.group({});

        for (const key of this.colorKeys) {
          const value =
            colors[key as keyof Colors] || DEFAULTS[key as keyof Colors];
          this.colorsForm.addControl(
            key,
            this.fb.control(value, [
              Validators.pattern(/^#([0-9A-F]{3}){1,2}$/i),
            ])
          );
        }
      })
    );
  }

  formatLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1') // Insert space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
  }

  getSafeColor(value: string): string {
    const temp = document.createElement('div');
    temp.style.color = '';
    temp.style.color = value;
    // The browser resets to an empty string if the color is invalid
    return temp.style.color ? value : '#444'; // fallback: dark gray
  }

  submit(): void {
    if (this.colorsForm.valid) {
      this.colorService.postColors(this.colorsForm.value);
    } else {
      this.snackbarService.showSnackBar(
        'Form is invalid',
        '',
        3000,
        SnackbarType.Error
      );
    }
  }

  resetSettings(): void {
    this.isResetting = false;
    this.colorsForm.patchValue(DEFAULTS, { emitEvent: false });
    Object.keys(this.colorsForm.controls).forEach((key) => {
      const control = this.colorsForm.get(key);
      control?.markAsPristine();
      control?.markAsUntouched();
    });

    // Delay the reset flag after form update cycle completes
    setTimeout(() => {
      this.isResetting = true;
    }, 100); // Defer to next tick
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
