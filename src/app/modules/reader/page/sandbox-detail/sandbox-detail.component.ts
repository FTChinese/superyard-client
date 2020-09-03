import { Component, OnInit } from '@angular/core';
import { SandboxUser } from 'src/app/data/schema/reader';
import { SandboxService } from '../../service/sandbox.service';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { getPaging } from 'src/app/shared/widget/paging';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';

@Component({
  selector: 'app-sandbox-detail',
  templateUrl: './sandbox-detail.component.html',
  styleUrls: ['./sandbox-detail.component.scss']
})
export class SandboxDetailComponent implements OnInit {

  user: SandboxUser

  constructor(
    private sandboxService: SandboxService,
    private progress: ProgressService,
    private toast: ToastService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');

        return this.sandboxService.loadAccount(id);
      })
    )
    .subscribe({
      next: account => {
        console.log('Sandbox users: %o', account);

        this.progress.stop();
        this.user = account;
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();

        const reqErr = new RequestError(err);

        this.toast.error(reqErr.message);
      }
    });
  }

}
