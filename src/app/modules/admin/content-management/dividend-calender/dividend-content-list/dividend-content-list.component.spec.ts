import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendContentListComponent } from './dividend-content-list.component';

describe('DividendContentListComponent', () => {
  let component: DividendContentListComponent;
  let fixture: ComponentFixture<DividendContentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividendContentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DividendContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
