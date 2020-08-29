import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { DynamicControl, InputControl, TextareaControl } from 'src/app/shared/widget/control';
import { ArticleForm, Article } from 'src/app/data/schema/wiki';
import { ToastService } from 'src/app/shared/service/toast.service';
import { WikiService } from '../../service/wiki.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [FormService]
})
export class EditorComponent implements OnInit {

  @Input() article: Article;

  controls: DynamicControl[] = [
    new InputControl({
      value: '',
      key: 'title',
      validators: [Validators.required],
      label: 'Title *',
      type: 'text',
      desc: 'Required',
    }),
    new TextareaControl({
      value: null,
      key: 'body',
      label: 'Body',
      rows: 20
    }),
    new TextareaControl({
      value: null,
      key: 'summary',
      label: 'Summary',
      rows: 3
    }),
    new InputControl({
      value: null,
      key: 'keyword',
      label: 'Keyword',
      type: 'text'
    }),
  ];

  form: FormGroup;
  button: Button = Button
    .primary()
    .setName('Save');

  preview: ArticleForm;

  get isUpdating(): boolean {
    return !!this.article
  }

  pageTitle: string;

  constructor(
    private formService: FormService,
    private toast: ToastService,
    private wikiService: WikiService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.article) {
      this.pageTitle = 'Edit wiki article';
    } else {
      this.pageTitle = 'Compose new wiki article';
    }

    this.formService.formCreated$.subscribe(form => {
      this.form = form;
      this.setupPreview();

      if (this.article) {
        this.patchForm();
      }
    });

    this.formService.formSubmitted$.subscribe(data => {
      const formData: ArticleForm = JSON.parse(data);

      console.log('Form data: %o', formData);

      if (this.article) {
        this.update(formData)
      } else {
        this.create(formData);
      }
    });
  }

  private setupPreview() {
    this.form.valueChanges
      .subscribe((data: ArticleForm) => {
        this.preview = data;
      });
  }

  private patchForm() {
    this.form.patchValue({
      title: this.article.title,
      summary: this.article.summary,
      body: this.article.body,
      keyword: this.article.keyword,
    });
  }

  private create(data: ArticleForm) {
    this.wikiService.createArticle(data)
      .subscribe({
        next: () => {
          this.toast.info('Article created!');
          this.router.navigate(['../'], {
            relativeTo: this.route
          })
        },
        error: this.handleError.bind(this)
      });
  }

  private update(data: ArticleForm) {
    this.wikiService.updateArticle(this.article.id, data)
      .subscribe({
        next: () => {
          this.toast.info('Article updated!');
          this.formService.enable(true);
        },
        error: this.handleError.bind(this)
      })
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);

    const reqErr = new RequestError(err);

    if (!reqErr.unprocessable) {
      this.formService.enable(true);
      this.toast.error(reqErr.message);
      return;
    }

    this.formService.sendError(reqErr);
    this.toast.error('You have an error in you subbmitted data!')
  }
}
