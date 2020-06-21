import { TestBed } from '@angular/core/testing';

import { ProductBuilderService } from './product-builder.service';

describe('ProductBuilderService', () => {
  let service: ProductBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
