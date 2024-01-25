import { TestBed } from '@angular/core/testing';

import { WhatsNewService } from './whats-new.service';

describe('WhatsNewService', () => {
  let service: WhatsNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhatsNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
