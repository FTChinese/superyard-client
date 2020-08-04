import { TestBed } from '@angular/core/testing';

import { DynamicControlService } from './dynamic-control.service';

describe('DynamicControlService', () => {
  let service: DynamicControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
