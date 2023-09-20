import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommunityNotesComponent } from './add-community-notes.component';

describe('AddCommunityNotesComponent', () => {
  let component: AddCommunityNotesComponent;
  let fixture: ComponentFixture<AddCommunityNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommunityNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommunityNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
