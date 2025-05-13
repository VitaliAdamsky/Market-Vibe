import { Injectable } from '@angular/core';
import { SnackbarService } from 'src/services/snackbar.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { SnackbarType } from '../models/shared/snackbar-type';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandler {
  constructor(private snackBarService: SnackbarService) {}

  handleError<T>(
    operation: string = 'operation'
  ): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>) =>
      source.pipe(
        catchError((error) => {
          console.error(`${operation} failed:`, error);
          this.snackBarService.showSnackBar(
            `${operation} failed.`,
            '',
            8000,
            SnackbarType.Error
          );
          return throwError(() => error);
        })
      );
  }
}
