// html-content.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HtmlContentService {
  constructor(private http: HttpClient) {}

  getHtmlContent(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }
}
