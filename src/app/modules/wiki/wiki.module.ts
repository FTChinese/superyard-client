import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WikiRoutingModule } from './wiki-routing.module';
import { WikiListComponent } from './page/wiki-list/wiki-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditArticleComponent } from './page/edit-article/edit-article.component';
import { EditorComponent } from './component/editor/editor.component';


@NgModule({
  declarations: [
    WikiListComponent,
    EditArticleComponent,
    EditorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    WikiRoutingModule
  ]
})
export class WikiModule { }
