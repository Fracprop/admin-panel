import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionCalenderListComponent } from './auction-calender-list.component';

describe('AuctionCalenderListComponent', () => {
  let component: AuctionCalenderListComponent;
  let fixture: ComponentFixture<AuctionCalenderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionCalenderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCalenderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
