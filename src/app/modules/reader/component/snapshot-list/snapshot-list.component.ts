import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MemberSnapshot } from 'src/app/data/schema/membership';
import { PagedData } from 'src/app/data/schema/paged-data';
import { ReaderAccount } from 'src/app/data/schema/reader';
import { RequestError } from 'src/app/data/schema/request-result';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { buildPagination, Pagination } from 'src/app/shared/widget/paging';
import { ReaderService } from '../../service/reader.service';

@Component({
  selector: 'app-snapshot-list',
  templateUrl: './snapshot-list.component.html',
  styleUrls: ['./snapshot-list.component.scss']
})
export class SnapshotListComponent implements OnInit {
  @Input() account: ReaderAccount;

  snapList: PagedData<MemberSnapshot>;
  pagination: Pagination;

  constructor(
    private readerService: ReaderService,
    private toast: ToastService,
    private progress: ProgressService,
  ) { }

  ngOnInit(): void {
    this.fetchData(1);
  }

  private fetchData(page: number) {
    this.readerService.listMemberSnapshot(this.account, {
      page,
      perPage: 20
    })
      .subscribe({
        next: list => {
          this.progress.stop();
          this.snapList = list;

          this.pagination = buildPagination(list);
        },
        error: (err: HttpErrorResponse) => {
          this.progress.stop();

          const reqErr = new RequestError(err);

          this.toast.error(reqErr.message);
        }
      });
  }

  onPagination(n: number) {
    console.log(n);
    this.progress.start();
    this.fetchData(n);
  }
}
