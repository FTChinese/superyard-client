import { Component, OnInit, Input } from '@angular/core';
import { BaseProduct } from 'src/app/data/schema/product';
import { ProductBuilderService } from 'src/app/core/service/product-builder.service';
import { DynamicControl } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {

  @Input() product: BaseProduct;
  @Input() showHeader = true;
  @Input() showFooter = true;

  isDuplicating = false;
  isEditing = false;
  get duplicateBtn(): string {
    return this.isEditing
      ? 'Cancel'
      : 'Duplicate'
  }

  controls: DynamicControl[]

  button: Button;

  constructor(
    private builder: ProductBuilderService,
  ) { }

  ngOnInit(): void {
  }

  select() {
    this.builder.setProduct(this.product);
  }

  onCreated(p: BaseProduct) {
    this.builder.createProduct(p);
    this.toggleEdit();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
