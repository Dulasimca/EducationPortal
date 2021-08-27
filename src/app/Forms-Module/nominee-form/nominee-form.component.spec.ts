import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomineeFormComponent } from './nominee-form.component';

describe('NomineeFormComponent', () => {
  let component: NomineeFormComponent;
  let fixture: ComponentFixture<NomineeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NomineeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NomineeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
