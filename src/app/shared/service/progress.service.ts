import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  on = false;

  constructor() { }

  /**
   * To show the progress spinner upon page loading,
   * call this method in the constructor rather than
   * ngOnInit() method to avoid ExpressionChangedAfterItHasBeenCheckedError
   */
  start() {
    this.on = true;
  }

  stop() {
    this.on = false;
  }
}
