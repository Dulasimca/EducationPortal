import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolmasterComponent } from './schoolmaster.component';

describe('SchoolmasterComponent', () => {
  let component: SchoolmasterComponent;
  let fixture: ComponentFixture<SchoolmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
