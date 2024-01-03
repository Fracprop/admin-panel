import { TestBed } from '@angular/core/testing';

import { DividendCalenderService } from './dividend-calender.service';

describe('DividendCalenderService', () => {
  let service: DividendCalenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DividendCalenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
