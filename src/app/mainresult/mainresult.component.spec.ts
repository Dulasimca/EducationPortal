import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainresultComponent } from './mainresult.component';

describe('MainresultComponent', () => {
  let component: MainresultComponent;
  let fixture: ComponentFixture<MainresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
