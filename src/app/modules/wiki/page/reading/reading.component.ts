import { Component, OnInit } from '@angular/core';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { WikiService } from '../../service/wiki.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { Article } from 'src/app/data/schema/wiki';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss']
})
export class ReadingComponent implements OnInit {

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
        return this.wikiService.loadArticle(Number.parseInt(id, 10));
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
    });
  }


}
