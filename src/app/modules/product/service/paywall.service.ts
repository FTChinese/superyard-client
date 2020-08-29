import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BannerForm } from '../schema/BannerForm';
import { Observable, of } from 'rxjs';
import { Banner, Promo, Paywall } from 'src/app/data/schema/paywall';
import { switchMap } from 'rxjs/operators';
import { PromoReq } from '../schema/PromoForm';

@Injectable({
  providedIn: 'root'
})
export class PaywallService {

  constructor(
    private http: HttpClient
  ) { }

  loadPaywall(): Observable<Paywall> {
    return this.http.get<Paywall>('/api/paywall');
  }

  createBanner(b: BannerForm): Observable<Banner> {
    return this.http.post<Banner>(
      '/api/paywall/banner',
      b,
    );
  }

  loadBanner(): Observable<Banner> {
    return this.http.get<Banner>('/api/paywall/banner');
  }

  updateBanner(b: BannerForm): Observable<Banner> {
    return this.http.patch<Banner>(
      '/api/paywall/banner',
      b
    );
  }

  dropPromo(): Observable<boolean> {
    return this.http.delete(
      '/api/paywall/banner/promo',
      {
        observe: 'response'
      }
    )
    .pipe(switchMap(resp => of(resp.status === 204)));
  }

  createPromo(p: PromoReq): Observable<Promo> {
    return this.http.post<Promo>(
      '/api/paywall/promo',
      p,
    );
  }
}
