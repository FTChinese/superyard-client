import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SearchForm } from 'src/app/data/schema/form-data';
import { RequestError } from 'src/app/data/schema/request-result';
import { StaffAccount } from 'src/app/data/schema/staff';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { getPaging, Paging } from 'src/app/shared/widget/paging';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  staff: StaffAccount[];
  paging: Paging;

  constructor(
    private route: ActivatedRoute,
    private toast: ToastService,
    private progress: ProgressService,
    private adminService: AdminService,
  ) {
    progress.start
  }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      switchMap(params => {
        const paging = getPaging(params);
        this.paging = paging;

        return this.adminService.listStaff(paging);
      })
    )
    .subscribe({
      next: staff => {
        this.progress.stop();
        this.staff = staff;
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();
        const reqErr = new RequestError(err);

        this.toast.error(reqErr.message);
      }
    });
  }

  onKeyword(kw: string) {

  }
}
