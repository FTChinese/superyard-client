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

  private baseUrl = '/api/paywall';

  constructor(
    private http: HttpClient
  ) { }

  loadPaywall(): Observable<Paywall> {
    return this.http.get<Paywall>(this.baseUrl);
  }

  createBanner(b: BannerForm): Observable<Banner> {
    return this.http.post<Banner>(
      `${this.baseUrl}/banner`,
      b,
    );
  }

  loadBanner(): Observable<Banner> {
    return this.http.get<Banner>(`${this.baseUrl}/banner`);
  }

  updateBanner(b: BannerForm): Observable<Banner> {
    return this.http.patch<Banner>(
      `${this.baseUrl}/banner`,
      b
    );
  }

  dropPromo(): Observable<boolean> {
    return this.http.delete(
      `${this.baseUrl}/banner/promo`,
      {
        observe: 'response'
      }
    )
    .pipe(switchMap(resp => of(resp.status === 204)));
  }

  createPromo(p: PromoReq): Observable<Promo> {
    return this.http.post<Promo>(
      `${this.baseUrl}/promo`,
      p,
    );
  }

  rebuild(): Observable<string> {
    return this.http.get(
      `${this.baseUrl}/build`,
      {
        responseType: 'text'
      }
    );
  }
}
