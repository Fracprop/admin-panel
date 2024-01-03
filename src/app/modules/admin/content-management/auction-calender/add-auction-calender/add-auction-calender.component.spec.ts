import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuctionCalenderComponent } from './add-auction-calender.component';

describe('AddAuctionCalenderComponent', () => {
  let component: AddAuctionCalenderComponent;
  let fixture: ComponentFixture<AddAuctionCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAuctionCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAuctionCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
