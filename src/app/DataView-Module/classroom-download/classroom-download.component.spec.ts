import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDownloadComponent } from './classroom-download.component';

describe('ClassroomDownloadComponent', () => {
  let component: ClassroomDownloadComponent;
  let fixture: ComponentFixture<ClassroomDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
