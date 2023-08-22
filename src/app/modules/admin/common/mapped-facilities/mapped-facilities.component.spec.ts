import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappedFacilitiesComponent } from './mapped-facilities.component';

describe('MappedFacilitiesComponent', () => {
  let component: MappedFacilitiesComponent;
  let fixture: ComponentFixture<MappedFacilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappedFacilitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MappedFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
