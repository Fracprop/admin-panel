import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityNotesListComponent } from './community-notes-list.component';

describe('CommunityNotesListComponent', () => {
  let component: CommunityNotesListComponent;
  let fixture: ComponentFixture<CommunityNotesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityNotesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityNotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
