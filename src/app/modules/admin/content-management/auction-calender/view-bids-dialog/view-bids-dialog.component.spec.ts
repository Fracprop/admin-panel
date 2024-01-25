import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBidsDialogComponent } from './view-bids-dialog.component';

describe('ViewBidsDialogComponent', () => {
  let component: ViewBidsDialogComponent;
  let fixture: ComponentFixture<ViewBidsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBidsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBidsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
