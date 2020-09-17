import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PagedData } from 'src/app/data/schema/paged-data';
import { RequestError } from 'src/app/data/schema/request-result';
import { StaffAccount } from 'src/app/data/schema/staff';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { buildPrevNext, getPaging, Paging, PrevNextLink } from 'src/app/shared/widget/paging';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  staffList: PagedData<StaffAccount>;
  prevNext: PrevNextLink;

  constructor(
    private route: ActivatedRoute,
    private toast: ToastService,
    private progress: ProgressService,
    private adminService: AdminService,
  ) {
    progress.start();
  }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      switchMap(params => {

        return this.adminService.listStaff(getPaging(params));
      })
    )
    .subscribe({
      next: list => {
        this.progress.stop();
        this.staffList = list;

        this.prevNext = buildPrevNext(list);
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

  onNavigate() {
    this.progress.start();
  }
}
