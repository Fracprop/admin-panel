import { TestBed } from '@angular/core/testing';

import { PropertyBuyShareService } from './property-buy-share.service';

describe('PropertyBuyShareService', () => {
  let service: PropertyBuyShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyBuyShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
