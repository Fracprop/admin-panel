import { TestBed } from '@angular/core/testing';

import { AdminMangementResolver } from './admin-mangement.resolver';

describe('AdminMangementResolver', () => {
  let resolver: AdminMangementResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AdminMangementResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
