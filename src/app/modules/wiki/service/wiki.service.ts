import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ArticleTeaser, ArticleForm, Article } from 'src/app/data/schema/wiki';
import { Observable, of } from 'rxjs';
import { Paging, pagingParams } from 'src/app/shared/widget/paging';
import { switchMap } from 'rxjs/operators';

type NewArticleResp = Pick<Article, 'id'>;

@Injectable({
  providedIn: 'root'
})
export class WikiService {

  private readonly basePath = '/api/wiki';

  constructor(
    private http: HttpClient
  ) {}

  listArticles(p: Paging): Observable<ArticleTeaser[]> {
    return this.http.get<ArticleTeaser[]>(this.basePath, {
      params: pagingParams(p)
    });
  }

  createArticle(form: ArticleForm): Observable<NewArticleResp> {
    return this.http.post<NewArticleResp>(
      this.basePath,
      form
    );
  }

  loadArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.basePath}/${id}`);
  }

  updateArticle(id: number, form: ArticleForm): Observable<boolean> {
    return this.http.patch<boolean>(
        `${this.basePath}/${id}`,
        form,
        { observe: 'response'}
      )
      .pipe(
        switchMap(resp => of(resp.status === 204))
      );
  }
}
