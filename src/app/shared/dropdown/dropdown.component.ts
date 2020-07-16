import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { Button } from '../widget/button';
import { Link } from '../widget/link';

type Justify = 'right' | 'left';
type Align = 'top' | 'bottom';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() button: Button;
  @Input() items: Link[];
  @Input() justify: Justify = 'left';
  menuStyle: object;

  on = false;

  constructor(
    private elRef: ElementRef
  ) { }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    // If the client element is not inside the current wrapper.
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  private close() {
    this.on = false;
    this.menuStyle = undefined;
  }

  // Open/close the dropdown. This event is triggered by the bound element, or any child nodes.
  switchMenu(event): void {
    this.on = !this.on;

    if (this.on) {
      // currentTarget refers to the the element which binds the click event.
      const el: Element = event.currentTarget;
      this.menuStyle = {
        position: 'absolute',
        transform: `translateY(${el.clientHeight}px)`,
        top: '0px',
        bottom: 'auto',
        left: `${this.justify === 'left' ? '0px' : 'auto'}`,
        right: `${this.justify === 'left' ? 'auto' : '0px'}`,
        'will-change': 'transform',
      };
    } else {
      this.menuStyle = undefined;
    }
  }
}
