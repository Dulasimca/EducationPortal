import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsInformationComponent } from './assignments-information.component';

describe('AssignmentsInformationComponent', () => {
  let component: AssignmentsInformationComponent;
  let fixture: ComponentFixture<AssignmentsInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentsInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
