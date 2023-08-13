import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { postsReducer } from './state/reducers.state';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './state/effects.state';
import { PostsListPageComponent } from './pages/posts-list-page/posts-list-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { HeaderComponent } from './components/header/header.component';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state: any, action: any) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ state: postsReducer }, { metaReducers }),
    EffectsModule.forRoot(PostsEffects),
    GraphQLModule,
    HttpClientModule,
    PostsListPageComponent,
    PostPageComponent,
    HeaderComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
