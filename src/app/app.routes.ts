import { Routes } from '@angular/router';
import { Preview } from './pages/preview/preview';
import { AllPosts } from './pages/all-posts/all-posts';
import { AddPost } from './pages/add-post/add-post';
import { EditPost } from './pages/edit-post/edit-post';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'preview',
    pathMatch: 'full',
  },
  {
    path: 'preview',
    component: Preview,
  },
  {
    path: 'posts',
    component: AllPosts,
  },
  {
    path: 'posts/new',
    component: AddPost,
  },
  {
    path: 'posts/edit/:id',
    component: EditPost,
  },
];
