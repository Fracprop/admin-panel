import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsNewListingComponent } from './whats-new-listing.component';

describe('WhatsNewListingComponent', () => {
  let component: WhatsNewListingComponent;
  let fixture: ComponentFixture<WhatsNewListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsNewListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsNewListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
