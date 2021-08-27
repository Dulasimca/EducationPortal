import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadsessionFormComponent } from './downloadsession-form.component';

describe('DownloadsessionFormComponent', () => {
  let component: DownloadsessionFormComponent;
  let fixture: ComponentFixture<DownloadsessionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadsessionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsessionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
