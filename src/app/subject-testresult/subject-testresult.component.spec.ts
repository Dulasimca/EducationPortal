import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectTestresultComponent } from './subject-testresult.component';

describe('SubjectTestresultComponent', () => {
  let component: SubjectTestresultComponent;
  let fixture: ComponentFixture<SubjectTestresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectTestresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectTestresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
