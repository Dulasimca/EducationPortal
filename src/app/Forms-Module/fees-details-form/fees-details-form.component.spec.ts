import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesDetailsFormComponent } from './fees-details-form.component';

describe('FeesDetailsFormComponent', () => {
  let component: FeesDetailsFormComponent;
  let fixture: ComponentFixture<FeesDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeesDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
