import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommunityNotesComponent } from './edit-community-notes.component';

describe('EditCommunityNotesComponent', () => {
  let component: EditCommunityNotesComponent;
  let fixture: ComponentFixture<EditCommunityNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCommunityNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommunityNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
