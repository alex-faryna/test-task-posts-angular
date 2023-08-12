import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListPageComponent } from './components/posts-list-page/posts-list-page.component';
import { PostPageComponent } from './components/post-page/post-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'posts'},
  { path: 'posts', component: PostsListPageComponent },
  { path: 'posts/:id', component: PostPageComponent },
  { path: '**', redirectTo: 'posts'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
