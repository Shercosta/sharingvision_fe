import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../core/services/article.service';
import { Article, ArticleStatus, ComposeArticle } from '../../core/models/article.model';

@Component({
  selector: 'app-add-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.html',
  styleUrl: './add-post.css',
  standalone: true,
})
export class AddPost {
  private route = inject(ActivatedRoute);
  private articleService = inject(ArticleService);

  article = signal<ComposeArticle>({
    title: '',
    category: '',
    content: '',
    status: ArticleStatus.DRAFT,
  });

  saveDraft() {
    this.addArticle(ArticleStatus.DRAFT);
  }

  publishArticle() {
    this.addArticle(ArticleStatus.PUBLISH);
  }

  addArticle(status: ArticleStatus) {
    const article = this.article();

    this.articleService
      .createArticle({
        ...article,
        status,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
