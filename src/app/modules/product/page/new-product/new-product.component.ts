import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Tier } from 'src/app/data/schema/enum';
import { DynamicControlService } from 'src/app/shared/service/dynamic-control.service';
import { buildProductControls, CreateProductForm } from '../../schema/ProductForm';
import { buildPlanControls } from '../../schema/PlanForm';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {

  productControls = buildProductControls();

  planControls = buildPlanControls();

  form: FormGroup;

  constructor(
    readonly controlService: DynamicControlService
  ) { }

  ngOnInit(): void {
    this.form = this.controlService.toFormGroup(this.productControls);

    this.form.addControl('plans', new FormArray([]));

    // Monitor the product tier selected.
    // If it is premium, prices could not set billing cycle to month and forced to be year.
    this.form.get('tier').valueChanges.subscribe((v: Tier) => {
      this.planControls = buildPlanControls(v);

      // If user changed product's tier to premium after FormArray already exists,
      // force all form groups in the FormArray to set
      // cycle value to year.
      this.plansGroups.controls.forEach(fg => {
        fg.patchValue({
          cycle: 'year'
        });
      });

    });
  }

  get plansGroups() {
    return this.form.get('plans') as FormArray;
  }

  addPlan() {
    this.plansGroups.push(this.controlService.toFormGroup(this.planControls));
  }

  onRemovePrice(i: number) {
    this.plansGroups.removeAt(i);
  }

  onSubmit() {
    const formData: CreateProductForm = this.form.value;

    console.log(formData);
  }
}
