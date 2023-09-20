import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWhatsNewComponent } from './add-whats-new.component';

describe('AddWhatsNewComponent', () => {
  let component: AddWhatsNewComponent;
  let fixture: ComponentFixture<AddWhatsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWhatsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWhatsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
