import { Component, inject, OnInit, signal } from '@angular/core';
import { ArticleService } from '../../core/services/article.service';
import { Article, ArticleStatus } from '../../core/models/article.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-preview',
  imports: [CommonModule, MatIconModule],
  templateUrl: './preview.html',
  styleUrl: './preview.css',
  standalone: true,
})
export class Preview implements OnInit {
  private s = inject(ArticleService);

  articles = signal<Article[]>([]);

  limit = signal(5);
  offset = signal(0);
  total = signal(0);

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.s.getArticles(this.limit(), this.offset(), ArticleStatus.PUBLISH).subscribe((res) => {
      this.articles.set(res.data);
      this.total.set(res.pagination.total);
      this.offset.set(res.pagination.offset);
    });
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.offset.update((o) => o + this.limit());
      this.loadArticles();
    }
  }

  previousPage() {
    if (this.hasPreviousPage()) {
      this.offset.update((o) => o - this.limit());
      this.loadArticles();
    }
  }

  hasNextPage(): boolean {
    return this.offset() + this.limit() < this.total();
  }

  hasPreviousPage(): boolean {
    return this.offset() > 0;
  }

  currentPage(): number {
    return Math.floor(this.offset() / this.limit()) + 1;
  }

  totalPages(): number {
    return Math.ceil(this.total() / this.limit());
  }

  changeLimit(event: Event) {
    const value = +(event.target as HTMLSelectElement).value;

    this.limit.set(value);
    this.offset.set(0); // Go back to first page
    this.loadArticles();
  }
}
