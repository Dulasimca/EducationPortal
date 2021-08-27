import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyachievementFormComponent } from './myachievement-form.component';

describe('MyachievementFormComponent', () => {
  let component: MyachievementFormComponent;
  let fixture: ComponentFixture<MyachievementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyachievementFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyachievementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
