import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAuctionCalenderComponent } from './edit-auction-calender.component';

describe('EditAuctionCalenderComponent', () => {
  let component: EditAuctionCalenderComponent;
  let fixture: ComponentFixture<EditAuctionCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAuctionCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAuctionCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
