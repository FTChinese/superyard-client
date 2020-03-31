import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AlertService {

  private msgSource = new Subject<string>();

  received$ = this.msgSource.asObservable();

  constructor() { }

  show(msg: string) {
    this.msgSource.next(msg);
  }
}
