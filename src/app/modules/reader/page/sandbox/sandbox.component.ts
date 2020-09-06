import { Component, OnInit } from '@angular/core';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { SandboxService } from '../../service/sandbox.service'
import { SandboxUserForm } from '../../schema/sandbox-form';
import { FtcAccount } from 'src/app/data/schema/reader';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { getPaging } from 'src/app/shared/widget/paging';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent implements OnInit {

  users: FtcAccount[];

  constructor(
    private sandboxService: SandboxService,
    private progress: ProgressService,
    private toast: ToastService,
    private route: ActivatedRoute,
  ) {
    this.progress.start();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        return this.sandboxService.listUsers(getPaging(params))
      })
    )
    .subscribe({
      next: users => {
        console.log('Sandbox users: %o', users);

        this.progress.stop();
        this.users = users;
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();

        const reqErr = new RequestError(err);

        this.toast.error(reqErr.message);
      }
    });
  }

}
