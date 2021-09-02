import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBankUploadFormComponent } from './question-bank-upload-form.component';

describe('QuestionBankUploadFormComponent', () => {
  let component: QuestionBankUploadFormComponent;
  let fixture: ComponentFixture<QuestionBankUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionBankUploadFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionBankUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
