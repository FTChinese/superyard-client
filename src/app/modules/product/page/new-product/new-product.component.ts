import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Tier } from 'src/app/data/schema/enum';
import { DynamicControlService } from 'src/app/shared/service/dynamic-control.service';
import { buildProductControls, ProductCreationForm, ProductCreationReq, buildProductCreationReq } from '../../schema/ProductForm';
import { buildPlanControls } from '../../schema/PlanForm';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ProductService } from '../../service/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    readonly controlService: DynamicControlService,
    private productService: ProductService,
    readonly progress: ProgressService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router,
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
    const formData: ProductCreationForm = this.form.value;

    this.progress.start();
    this.form.disable();

    this.create(buildProductCreationReq(formData));
  }

  private create(reqData: ProductCreationReq) {

    console.log('Creating product %o', reqData);

    this.productService.createProduct(reqData)
      .subscribe({
        next: () => {
          this.progress.stop();
          this.toast.info('Product created successfully!');

          this.router.navigate(['../'], {
            relativeTo: this.route
          });
        },
        error: (err: HttpErrorResponse) => {
          this.progress.start();
          this.form.enable();

          const reqErr = new RequestError(err);
          this.toast.error(reqErr.message);
        }
      })
  }
}
