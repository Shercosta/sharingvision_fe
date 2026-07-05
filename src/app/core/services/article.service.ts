import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, ArticleStatus } from '../models/article.model';
import { environment } from '../../../environments/environment';
import { PaginatedResponse } from '../models/paginated-response.model';
import { ApiResponse } from '../models/api-response.mode';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/article`;

  getArticles(
    limit = 5,
    offset = 0,
    status: ArticleStatus | null = null,
  ): Observable<PaginatedResponse<Article>> {
    let params = new HttpParams().set('limit', limit).set('offset', offset);

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<PaginatedResponse<Article>>(this.api, { params });
  }

  getArticle(id: number): Observable<ApiResponse<Article>> {
    return this.http.get<ApiResponse<Article>>(`${this.api}/${id}`);
  }

  updateArticle(id: number, article: Partial<Article>) {
    return this.http.put<ApiResponse<Article>>(`${this.api}/${id}`, article);
  }

  softDeleteArticle(id: number) {
    return this.http.delete<ApiResponse<Article>>(`${this.api}/${id}`);
  }
}
