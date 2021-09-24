import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDownloadformsComponent } from './upload-downloadforms.component';

describe('UploadDownloadformsComponent', () => {
  let component: UploadDownloadformsComponent;
  let fixture: ComponentFixture<UploadDownloadformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDownloadformsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDownloadformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
