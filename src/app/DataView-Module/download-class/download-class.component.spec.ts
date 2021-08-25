import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadClassComponent } from './download-class.component';

describe('DownloadClassComponent', () => {
  let component: DownloadClassComponent;
  let fixture: ComponentFixture<DownloadClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
