import { Component, inject, OnInit, signal } from '@angular/core';
import { ArticleService } from '../../core/services/article.service';
import { Article } from '../../core/models/article.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-posts',
  imports: [CommonModule],
  templateUrl: './all-posts.html',
  styleUrl: './all-posts.css',
  standalone: true,
})
export class AllPosts implements OnInit {
  private articleService = inject(ArticleService);

  articles = signal<Article[]>([]);
  total = signal<number>(0);

  ngOnInit(): void {
    console.log('Pass');
    this.articleService.getArticles().subscribe((res) => {
      console.log(res);
      this.articles.set(res.data);
      this.total.set(res.pagination.total);
      console.log(this.articles);
    });
  }
}
