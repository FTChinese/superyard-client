import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/shared/service/form.service';
import { ActivatedRoute } from '@angular/router';
import { mockPaywall } from 'src/app/data/schema/mocker';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Banner } from 'src/app/data/schema/paywall';

@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.scss'],
  providers: [FormService],
})
export class EditBannerComponent implements OnInit {

  banner: Banner;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');

        return of(mockPaywall.banner);
      })
    )
    .subscribe(b => {
      this.banner = b;
    });

  }

}
