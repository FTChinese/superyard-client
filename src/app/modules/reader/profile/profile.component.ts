import { Component, OnInit } from '@angular/core';
import { TableRow } from '../account-item';
import { ActivatedRoute } from '@angular/router';
import { ReaderService } from '../reader.service';
import { switchMap } from 'rxjs/operators';
import { AccountKind } from 'src/app/data/schema/enums';
import { zip } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileRows: TableRow[];

  constructor(
    private route: ActivatedRoute,
    private readerService: ReaderService,
  ) { }

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe({
      next: data => console.log(data),
    })
    // zip(this.route.data, this.route.paramMap)
    //   .pipe(
    //     switchMap(([data, params]) => {
    //       const kind = data['kind'] as AccountKind;
    //       const id = params.get('id');

    //       console.log('Profile component laoding ' + kind + ': ' + id);

    //       if (kind === 'ftc') {
    //         return this.readerService.loadFtcAccount(id);
    //       } else {
    //         return this.readerService.loadWxAccount(id);
    //       }
    //     })
    //   )
  }

}
