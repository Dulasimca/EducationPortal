import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDetailsFormComponent } from './calendar-details-form.component';

describe('CalendarDetailsFormComponent', () => {
  let component: CalendarDetailsFormComponent;
  let fixture: ComponentFixture<CalendarDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
