import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySharePropertyListComponent } from './buy-share-property-list.component';

describe('BuySharePropertyListComponent', () => {
  let component: BuySharePropertyListComponent;
  let fixture: ComponentFixture<BuySharePropertyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuySharePropertyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySharePropertyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
