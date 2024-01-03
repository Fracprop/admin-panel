import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDividendContentComponent } from './edit-dividend-content.component';

describe('EditDividendContentComponent', () => {
  let component: EditDividendContentComponent;
  let fixture: ComponentFixture<EditDividendContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDividendContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDividendContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
