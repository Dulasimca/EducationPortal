import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectResultComponent } from './subject-result.component';

describe('SubjectResultComponent', () => {
  let component: SubjectResultComponent;
  let fixture: ComponentFixture<SubjectResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
