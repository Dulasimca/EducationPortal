import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { TableConstants } from 'src/app/Common-Module/TableConstants';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { MasterService } from 'src/app/Services/master-data.service';
import { RestAPIService } from 'src/app/Services/restAPI.service';

@Component({
  selector: 'app-result-form',
  templateUrl: './result-form.component.html',
  styleUrls: ['./result-form.component.css']
})
export class ResultFormComponent implements OnInit {
  examType: any;
  examTypeOptions: SelectItem[];
  subject: any;
  subjectOptions: SelectItem[];
  examDate: Date = new Date();
  class: any;
  classOptions: SelectItem[];
  section: any;
  sectionOptions: SelectItem[];
  topic: string;
  totalMarks: any;
  student: any;
  studentOptions: SelectItem[];
  shortYear: any;
  yearOptions: SelectItem[];
  marksScored: any;
  students?: any;
  classes?: any;
  sections?: any;
  subjects?: any;
  examTypes?: any;
  years?: any;
  disableSubject: boolean = true;
  resultCols: any;
  resultData: any[] = [];
  loading: boolean;
  resultId: number = 0;
  logged_user: User;
  resultDetails: any[] = [];
  @ViewChild('f', { static: false }) _resultForm: NgForm;
  @BlockUI() blockUI: NgBlockUI;
  constructor(private _masterService: MasterService, private _restApiService: RestAPIService,
    private _datepipe: DatePipe, private _messageService: MessageService,
    private _authService: AuthService, private _confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._masterService.getMaster('');
    this.years = this._masterService.getAccountingYear();
    this.resultCols = TableConstants.ResultEntryColumns;
    this.logged_user = this._authService.UserInfo;
  }

  onSelect(type) {
    this.years = this._masterService.getAccountingYear();
    this.sections = this._masterService.getMaster('S')
    this.classes = this._masterService.getMaster('C');
    this.subjects = this._masterService.getMaster('SB');
    this.examTypes = this._masterService.getMaster('TS');
    let studentSelection = [];
    let classSelection = [];
    let sectionSelection = [];
    let examTypeSelection = [];
    let subjectSelection = [];
    let yearSelection = [];
    switch (type) {
      case 'SB':
        this.subjects.forEach(c => {
          if ((c.class * 1) === this.class.value) {
            subjectSelection.push({ label: c.name, value: c.code })
          }
        });
        this.subjectOptions = subjectSelection;
        this.subjectOptions.unshift({ label: '-select', value: null });
        break;
      case 'CL':
        this.classes.forEach(c => {
          classSelection.push({ label: c.name, value: c.code })
        });
        this.classOptions = classSelection;
        this.classOptions.unshift({ label: '-select', value: null });
        if (this.class !== undefined && this.class !== null) {
          this.disableSubject = false;
        } else {
          this.disableSubject = true;
        }
        break;
      case 'SC':
        this.sections.forEach(s => {
          sectionSelection.push({ label: s.name, value: s.code })
        });
        this.sectionOptions = sectionSelection;
        this.sectionOptions.unshift({ label: '-select', value: null });
        break;
      case 'ET':
        this.examTypes.forEach(c => {
          examTypeSelection.push({ label: c.name, value: c.code })
        });
        this.examTypeOptions = examTypeSelection;
        this.examTypeOptions.unshift({ label: '-select', value: null });
        break;
      case 'ST':
        if (this.students.length !== 0) {
          this.students.forEach(s => {
            studentSelection.push({ label: s.FirstName, value: s.slno });
          });
          this.studentOptions = studentSelection;
          this.studentOptions.unshift({ label: '-select', value: null });
        }
        break;
      case 'SY':
        this.years.forEach(y => {
          yearSelection.push({ label: y.ShortYear, value: y.Id });

        })
        this.yearOptions = yearSelection;
        this.yearOptions.unshift({ label: '-select-', value: null });
        break;
    }
  }

  loadStudents() {
    this.students = [];
    this.student = null;
    this.studentOptions = [];
    if (this.class !== undefined && this.class !== null) {
      this.disableSubject = false;
    } else {
      this.disableSubject = true;
    }
    if (this.class !== undefined && this.class !== null && this.section !== undefined &&
      this.section !== null) {
      const params = { 'ClassId': this.class.value, 'SectionId': this.section.value };
      this._restApiService.getByParameters(PathConstants.StudentList_Get, params).subscribe(res => {
        if (res !== undefined && res !== null) {
          if (res.length !== 0) {
            this.students = res;
          } else {
            this._messageService.clear();
            this._messageService.add({
              key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
              summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoStudentsMsg
            });
          }
        } else {
          this._messageService.clear();
          this._messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoStudentsMsg
          });
        }
      })
    }
  }

  checkMarksInput() {
    if (this.totalMarks !== undefined && this.totalMarks !== null &&
      this.marksScored !== undefined && this.marksScored !== null &&
      this.totalMarks !== NaN && this.marksScored !== NaN) {
      if ((this.totalMarks * 1) < (this.marksScored * 1)) {
        var msg = 'Marks scored by student cannot be greater than total marks of exam. !';
        this._messageService.clear();
        this._messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: msg
        });
      }
    }
  }

  onEnter() {
    let exists: boolean = false;
    if (this.resultData.length >= 1) {
      for (let i = 0; i < this.resultData.length; i++) {
        if (this.resultData[i].StudentId === this.student.value) {
          exists = true;
          break;
        } else {
          exists = false;
        }
      }
    }
    if (exists) {
      this._messageService.clear();
      this._messageService.add({
        key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
        summary: ResponseMessage.SUMMARY_ERROR, detail: 'Cannot enter result twice per student, Please edit or re-check the result in below table!',
        life: 4000
      });
    } else {
      this.resultData.push({
        'RowId': this.resultId,
        'ExamName': this.examType.label,
        'ExamTypeId': this.examType.value,
        'eDate': this._datepipe.transform(this.examDate, 'dd/MM/yyyy'),
        'examActualDate': this.examDate,
        'ExamDate': this._datepipe.transform(this.examDate, 'MM/dd/yyyy'),
        'Section': this.section.label,
        'SectionId': this.section.value,
        'Class': this.class.label,
        'ClassId': this.class.value,
        'Student': this.student.label,
        'StudentId': this.student.value,
        'Subject': this.subject.label,
        'SubjectId': this.subject.value,
        'Topic': this.topic,
        'TotalMarks': this.totalMarks,
        'MarksScored': this.marksScored,
        'UserId': this.logged_user.id,
        'SchoolId': this.logged_user.schoolId,
        'AcademicYear': this.shortYear.label,
        'ShortYear': this.shortYear.value
      })
      this.onClear(2);
    }
  }

  onEdit(item, index) {
    console.log('edit', item);
    this.disableSubject = false;
    this.resultId = item.RowId;
    this.marksScored = item.MarksScored;
    this.totalMarks = item.TotalMarks;
    this.topic = item.Topic;
    this.subject = { label: item.Subject, value: item.SubjectId };
    this.subjectOptions = [{ label: item.Subject, value: item.SubjectId }];
    this.class = { label: item.Class, value: item.ClassId };
    this.classOptions = [{ label: item.Class, value: item.ClassId }];
    this.section = { label: item.Section, value: item.SectionId };
    this.sectionOptions = [{ label: item.Section, value: item.SectionId }];
    this.examDate = new Date(item.examActualDate);
    this.examType = { label: item.ExamName, value: item.ExamTypeId };
    this.examTypeOptions = [{ label: item.ExamName, value: item.ExamTypeId }];
    this.shortYear = { label: item.AcademicYear, value: item.ShortYear };
    this.yearOptions = [{ label: item.AcademicYear, value: item.ShortYear }];
    this.loadStudents();
    this.student = { label: item.Student, value: item.StudentId };
    this.studentOptions = [{ label: item.Student, value: item.StudentId }];
    this.resultData.splice(index, 1);
  }

  onDelete(item, index) {
    if (item.RowId === 0) {
      this.resultData.splice(index, 1);
    } else {
      const selectedRowId = item.RowId;
      this._confirmationService.confirm({
        message: 'Do you want to delete the saved record?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.blockUI.start('Deleting...');
          this._restApiService.put(PathConstants.Result_Delete, selectedRowId).subscribe(res => {
            if (res !== undefined && res !== null) {
              if (res) {
                this.blockUI.stop();
                this._messageService.clear();
                this._messageService.add({
                  key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
                  summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.DeleteSuccessMsg
                });
                this.onView();
              } else {
                this.blockUI.stop();
                this._messageService.clear();
                this._messageService.add({
                  key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
                  summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.DeleteFailMsg
                });
              }
            } else {
              this.blockUI.stop();
              this._messageService.clear();
              this._messageService.add({
                key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
                summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.DeleteFailMsg
              });
            }
          })
        },
        reject: (type) => { }
      });
    }
  }

  onView() {
    if (this.examDate !== undefined && this.examDate !== null) {
      this.loadResults();
    } else {
      this._messageService.clear();
      this._messageService.add({
        key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
        summary: ResponseMessage.SUMMARY_WARNING, detail: 'Please select exam date to view submitted result deatils !'
      });
    }
  }

  loadResults() {
    this.resultData = [];
    this.loading = true;
    const params = {
      'SchoolId': this.logged_user.schoolId,
      'UserId': this.logged_user.id,
      'Date': this._datepipe.transform(this.examDate, 'MM/dd/yyyy')
    }
    this._restApiService.getByParameters(PathConstants.Result_Get, params).subscribe(res => {
      if (res !== undefined && res !== null) {
        if (res.length !== 0) {
          this.resultData = res;
          this.loading = false;
          console.log('view', this.resultData);
        } else {
          this.loading = false;
          this._messageService.clear();
          this._messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
            summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordForExamDate
          });
        }
      } else {
        this.loading = false;
        this._messageService.clear();
        this._messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        });
      }
    })
  }

  onSubmit() {
    if (this.resultData.length !== 0) {
      this.blockUI.start();
      this.resultData.forEach(i => {
        delete i.examActualDate;
      })
      this._restApiService.post(PathConstants.Result_Post, this.resultData).subscribe(res => {
        if (res !== undefined && res !== null) {
          if (res) {
            this.blockUI.stop();
            this.onClear(1);
            this._messageService.clear();
            this._messageService.add({
              key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
              summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.SuccessMessage
            });
          } else {
            this.blockUI.stop();
            this._messageService.clear();
            this._messageService.add({
              key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
              summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
            });
          }
        } else {
          this.blockUI.stop();
          this._messageService.clear();
          this._messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          });
        }
      }, (err: HttpErrorResponse) => {
        this.blockUI.stop();
        if (err.status === 0 || err.status === 400) {
          this._messageService.clear();
          this._messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          })
        }
      })
    }
  }

  onClear(type) {
    if (type === 1) {
      this._resultForm.reset();
      this._resultForm.form.markAsUntouched();
      this._resultForm.form.markAsPristine();
      this.disableSubject = true;
      this.resultData = [];
      this.resultId = 0;
      this.examDate = new Date();
      this.class = null;
      this.classOptions = [];
      this.section = null;
      this.sectionOptions = [];
      this.subject = null;
      this.subjectOptions = [];
      this.shortYear = null;
      this.yearOptions = [];
      this.examType = null;
      this.examTypeOptions = [];
    } else {
      this._resultForm.form.controls['_student'].reset();
      this._resultForm.form.controls['_marksscored'].reset();
      this.student = null;
      this.studentOptions = [];
      this.marksScored = null;
      this.resultId = 0;
    }
  }
}
