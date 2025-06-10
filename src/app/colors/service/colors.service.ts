import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Colors } from '../models/colors';
import { HttpErrorHandler } from 'src/app/utils/http-error-handler';
import { SnackbarService } from 'src/services/snackbar.service';
import { SnackbarType } from 'src/app/shared/models/snackbar-type';
import { env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  //colorsUrl = `${env.renderBaseURL}/colors`;
  colorsUrl = `${env.utilsBaseURL}/colors`;
  constructor(
    private http: HttpClient,
    private errorHandler: HttpErrorHandler,
    private snackbarService: SnackbarService
  ) {}

  getColors(isDefaultColors: boolean): Observable<Colors> {
    const url = new URL(this.colorsUrl);
    url.searchParams.append('isDefaultColors', isDefaultColors.toString());
    return this.http
      .get<Colors>(url.toString(), {
        params: { isDefaultColors },
      })
      .pipe(
        tap((colors) => {
          console.log('Color settings fetched', colors);
        }),
        this.errorHandler.handleError<Colors>('Fetching color settings')
      );
  }

  postColors(isDefaultColors: boolean, colors: Colors) {
    const url = new URL(this.colorsUrl);
    url.searchParams.append('isDefaultColors', isDefaultColors.toString());

    this.http
      .post(url.toString(), colors)
      .pipe(this.errorHandler.handleError('Saving color settings'))
      .subscribe({
        next: (data) => {
          console.log('Color settings saved', data);
          this.snackbarService.showSnackBar(
            'Color settings saved',
            '',
            2000,
            SnackbarType.Info
          );
        },
        error: (err) => {
          console.error('Failed to save color settings', err);
          // Optionally show an error snackbar or handle the error as needed
        },
      });
  }
}
