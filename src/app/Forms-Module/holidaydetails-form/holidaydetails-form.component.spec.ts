import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaydetailsFormComponent } from './holidaydetails-form.component';

describe('HolidaydetailsFormComponent', () => {
  let component: HolidaydetailsFormComponent;
  let fixture: ComponentFixture<HolidaydetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidaydetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaydetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
