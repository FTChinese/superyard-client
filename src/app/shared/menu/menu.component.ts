import { Component, OnInit, Input, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';
import { MenuItem } from '../widget/menu';

type Justify = 'right' | 'left';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() items: MenuItem[];
  @Input() justify: Justify = 'right';
  @Output() selected = new EventEmitter<MenuItem>();

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
  toggleMenu(event): void {
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

  select(item: MenuItem) {
    this.selected.emit(item);
  }
}
