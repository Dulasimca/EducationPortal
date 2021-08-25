import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineClassroomComponent } from './online-classroom.component';

describe('OnlineClassroomComponent', () => {
  let component: OnlineClassroomComponent;
  let fixture: ComponentFixture<OnlineClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
