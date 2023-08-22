import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddValueToDropdownComponent } from './add-value-to-dropdown.component';

describe('AddValueToDropdownComponent', () => {
  let component: AddValueToDropdownComponent;
  let fixture: ComponentFixture<AddValueToDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddValueToDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddValueToDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
