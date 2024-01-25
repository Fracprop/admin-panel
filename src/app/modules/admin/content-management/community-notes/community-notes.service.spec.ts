import { TestBed } from '@angular/core/testing';

import { CommunityNotesService } from './community-notes.service';

describe('CommunityNotesService', () => {
  let service: CommunityNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
