import { TestBed } from '@angular/core/testing';

import { AuctionCalenderService } from './auction-calender.service';

describe('AuctionCalenderService', () => {
  let service: AuctionCalenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionCalenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
