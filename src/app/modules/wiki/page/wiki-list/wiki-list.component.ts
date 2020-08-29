import { Component, OnInit } from '@angular/core';
import { ArticleTeaser} from 'src/app/data/schema/wiki';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { WikiService } from '../../service/wiki.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Paging, getPaging } from 'src/app/shared/widget/paging';
import { RequestError } from 'src/app/data/schema/request-result';

@Component({
  selector: 'app-wiki-list',
  templateUrl: './wiki-list.component.html',
  styleUrls: ['./wiki-list.component.scss']
})
export class WikiListComponent implements OnInit {

  teasers: ArticleTeaser[];

  constructor(
    private wikiService: WikiService,
    private toast: ToastService,
    private progress: ProgressService,
    private route: ActivatedRoute,
  ) {
    this.progress.start();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        return this.wikiService.listArticles(getPaging(params));
      })
    )
    .subscribe({
      next: teasers => {
        console.log('Article list: %o', teasers);

        this.progress.stop();

        this.teasers = teasers;
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();

        const reqErr = new RequestError(err);

        this.toast.error(reqErr.message);
      }
    });
  }

}
