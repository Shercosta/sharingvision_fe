export enum ArticleStatus {
  PUBLISH = 'Publish',
  DRAFT = 'Draft',
  TRASH = 'Trash',
}

export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  status: ArticleStatus;
  created_date: string;
  updated_date: string;
}
