import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WikiListComponent } from './page/wiki-list/wiki-list.component';
import { EditArticleComponent } from './page/edit-article/edit-article.component';
import { EditorComponent } from './component/editor/editor.component';
import { ReadingComponent } from './page/reading/reading.component';

const routes: Routes = [
  {
    path: '',
    component: WikiListComponent
  },
  {
    path: 'new',
    component: EditorComponent
  },
  {
    path: ':id',
    component: ReadingComponent
  },
  {
    path: ':id/edit',
    component: EditArticleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WikiRoutingModule { }
