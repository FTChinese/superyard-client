import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/data/schema/wiki';
import { ActivatedRoute } from '@angular/router';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { WikiService } from '../../service/wiki.service';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  article: Article;

  constructor(
    private route: ActivatedRoute,
    private progress: ProgressService,
    private toast: ToastService,
    private wikiService: WikiService
  ) {
    this.progress.start();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        console.log('Article id %s', id);
        return this.wikiService.loadArticle(Number.parseInt(id));
      })
    )
    .subscribe({
      next: article => {
        console.log('Article loaded: %o', article);
        this.progress.stop();
        this.article = article;
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();
        const reqErr = new RequestError(err);
        this.toast.error(reqErr.message);
      }
    })
  }
}
