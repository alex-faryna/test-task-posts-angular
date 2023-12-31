import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListPageComponent } from './pages/posts-list-page/posts-list-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'posts'},
  { path: 'posts', component: PostsListPageComponent },
  { path: 'posts/:id', component: PostPageComponent },
  { path: 'posts/:id/edit', component: EditPageComponent },
  { path: '**', redirectTo: 'posts'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
