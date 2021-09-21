import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomClassroomComponent } from './zoom-classroom.component';

describe('ZoomClassroomComponent', () => {
  let component: ZoomClassroomComponent;
  let fixture: ComponentFixture<ZoomClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomClassroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
