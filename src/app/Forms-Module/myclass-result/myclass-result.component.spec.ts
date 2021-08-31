import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyclassResultComponent } from './myclass-result.component';

describe('MyclassResultComponent', () => {
  let component: MyclassResultComponent;
  let fixture: ComponentFixture<MyclassResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyclassResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyclassResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
