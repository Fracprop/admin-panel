import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDividendContentComponent } from './add-dividend-content.component';

describe('AddDividendContentComponent', () => {
  let component: AddDividendContentComponent;
  let fixture: ComponentFixture<AddDividendContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDividendContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDividendContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
