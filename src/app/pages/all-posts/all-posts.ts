import { Component, inject, OnInit, signal } from '@angular/core';
import { ArticleService } from '../../core/services/article.service';
import { Article, ArticleStatus } from '../../core/models/article.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './all-posts.html',
  styleUrl: './all-posts.css',
})
export class AllPosts implements OnInit {
  private articleService = inject(ArticleService);

  readonly ArticleStatus = ArticleStatus;

  articles = signal<Article[]>([]);
  total = signal<number>(0);

  activeTab: ArticleStatus = ArticleStatus.PUBLISH;

  ngOnInit(): void {
    this.loadArticles();
  }

  setTab(tab: ArticleStatus) {
    if (this.activeTab === tab) return;

    this.activeTab = tab;
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getArticles(5, 0, this.activeTab).subscribe((res) => {
      this.articles.set(res.data);
      this.total.set(res.pagination.total);
    });
  }

  makeItTrash(id: number) {
    console.log('pass delete', id);

    this.articleService.softDeleteArticle(id).subscribe({
      next: () => {
        this.loadArticles();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
