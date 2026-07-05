import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArticleService } from '../../core/services/article.service';
import { Article, ArticleStatus } from '../../core/models/article.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  templateUrl: './edit-post.html',
  styleUrl: './edit-post.css',
  imports: [CommonModule, FormsModule],
})
export class EditPost implements OnInit {
  private route = inject(ActivatedRoute);
  private articleService = inject(ArticleService);

  article = signal<Article | null>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.articleService.getArticle(id).subscribe((res) => {
      this.article.set(res.data);
    });
  }

  saveDraft() {
    this.updateArticle(ArticleStatus.DRAFT);
  }

  publishArticle() {
    this.updateArticle(ArticleStatus.PUBLISH);
  }

  updateArticle(status: ArticleStatus) {
    const article = this.article();
    if (!article) return;

    this.articleService
      .updateArticle(article.id, {
        title: article.title,
        content: article.content,
        category: article.category,
        status,
      })
      .subscribe({
        next: (res) => {
          console.log('updated', res);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
