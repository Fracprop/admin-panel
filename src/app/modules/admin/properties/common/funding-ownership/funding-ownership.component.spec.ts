import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingOwnershipComponent } from './funding-ownership.component';

describe('FundingOwnershipComponent', () => {
  let component: FundingOwnershipComponent;
  let fixture: ComponentFixture<FundingOwnershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundingOwnershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingOwnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
