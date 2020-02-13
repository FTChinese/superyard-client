import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFlash]'
})
export class FlashDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
