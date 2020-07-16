import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WikiRoutingModule } from './wiki-routing.module';
import { WikiListComponent } from './page/wiki-list/wiki-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewArticleComponent } from './page/new-article/new-article.component';
import { EditArticleComponent } from './page/edit-article/edit-article.component';
import { ArticleFormComponent } from './component/article-form/article-form.component';


@NgModule({
  declarations: [WikiListComponent, NewArticleComponent, EditArticleComponent, ArticleFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    WikiRoutingModule
  ]
})
export class WikiModule { }
