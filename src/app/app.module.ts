import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from './state/reducers.state';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './state/effects.state';
import { PostsListPageComponent } from './pages/posts-list-page/posts-list-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ state: postsReducer }, {}),
    EffectsModule.forRoot(PostsEffects),
    GraphQLModule,
    HttpClientModule,
    PostsListPageComponent,
    PostPageComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
