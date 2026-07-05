import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { environment } from '../../../environments/environment';
import { PaginatedResponse } from '../models/paginated-response.model';
import { ApiResponse } from '../models/api-response.mode';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/article`;

  getArticles(limit = 5, offset = 0): Observable<PaginatedResponse<Article>> {
    return this.http.get<PaginatedResponse<Article>>(`${this.api}?limit=${limit}&offset=${offset}`);
  }

  getArticle(id: number): Observable<ApiResponse<Article>> {
    return this.http.get<ApiResponse<Article>>(`${this.api}/${id}`);
  }
}
