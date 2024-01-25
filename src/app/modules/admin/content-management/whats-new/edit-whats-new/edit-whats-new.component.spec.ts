import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWhatsNewComponent } from './edit-whats-new.component';

describe('EditWhatsNewComponent', () => {
  let component: EditWhatsNewComponent;
  let fixture: ComponentFixture<EditWhatsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWhatsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWhatsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
