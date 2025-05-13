import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colors } from '../models/colors';
import { HttpErrorHandler } from 'src/app/utils/http-error-handler';
import { SnackbarService } from 'src/services/snackbar.service';
import { SnackbarType } from 'src/app/models/shared/snackbar-type';
import { env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  colorsUrl = `${env.renderBaseURL}/colors`;
  constructor(
    private http: HttpClient,
    private errorHandler: HttpErrorHandler,
    private snackbarService: SnackbarService
  ) {}

  getColors(): Observable<Colors> {
    return this.http
      .get<Colors>(this.colorsUrl)
      .pipe(this.errorHandler.handleError<Colors>('Fetching color settings'));
  }

  postColors(colors: Colors) {
    this.http
      .post(this.colorsUrl, colors)
      .pipe(this.errorHandler.handleError('Saving color settings'))
      .subscribe((data) => {
        console.log('Color settings saved', data);
        this.snackbarService.showSnackBar(
          'Color settings saved',
          '',
          2000,
          SnackbarType.Info
        );
      });
  }
}
