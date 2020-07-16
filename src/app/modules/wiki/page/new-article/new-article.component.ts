import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/shared/service/form.service';
import { switchMap } from 'rxjs/operators';
import { ArticleForm } from 'src/app/data/schema/wiki';
import { of } from 'rxjs';
import { ToastService } from 'src/app/shared/service/toast.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
  providers: [FormService]
})
export class NewArticleComponent implements OnInit {

  constructor(
    private formService: FormService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {

    this.formService.formSubmitted$.pipe(
      switchMap(data => {
        const formData: ArticleForm = JSON.parse(data);
        console.log(formData);
        return of(formData);
      })
    )
    .subscribe({
      next: article => {

      },
      error: err => {

      }
    });
  }

  onSubmit() {

  }
}
