import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyschoolViewComponent } from './myschool-view.component';

describe('MyschoolViewComponent', () => {
  let component: MyschoolViewComponent;
  let fixture: ComponentFixture<MyschoolViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyschoolViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyschoolViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
