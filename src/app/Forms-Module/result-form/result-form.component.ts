import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { TableConstants } from 'src/app/Common-Module/TableConstants';
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
  marksScored: any;
  students?: any;
  classes?: any;
  sections?: any;
  subjects?: any;
  examTypes?: any;
  disableSubject: boolean = true;
  resultCols: any;
  resultData: any[] = [];
  loading: boolean;
  @ViewChild('f', { static: false }) _resultForm: NgForm;
  @BlockUI() blockUI: NgBlockUI;
  constructor(private _masterService: MasterService, private _restApiService: RestAPIService,
    private _datepipe: DatePipe) { }

  ngOnInit(): void {
    this._masterService.getMaster('');
    this.resultCols = TableConstants.ResultEntryColumns;
  }

  onSelect(type) {
    this.sections = this._masterService.getMaster('S')
    this.classes = this._masterService.getMaster('C');
    this.subjects = this._masterService.getMaster('SB');
    this.examTypes = this._masterService.getMaster('TS');
    let studentSelection = [];
    let classSelection = [];
    let sectionSelection = [];
    let examTypeSelection = [];
    let subjectSelection = [];
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
        if (res !== undefined && res !== null && res.length !== 0) {
          this.students = res;
        }
      })
    }
  }

  checkMarksInput() {
    if(this.totalMarks !== undefined && this.totalMarks !== null && 
      this.marksScored !== undefined && this.marksScored !== null) {
          
      }
  }

  onEnter() {
    this.resultData.push({
      'ExamName': this.examType.label,
      'ExamTypeId': this.examType.value,
      'ExamDate': this._datepipe.transform(this.examDate, 'dd/MM/yyyy'),
      'Date': this.examDate,
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
      'MarksScored': this.marksScored
    })
    this.onClear(2);
  }

  onEdit(item) {
    this.marksScored = item.MarksScored;
    this.totalMarks = item.TotalMarks;
    this.topic = item.Topic;
    this.subject = { label: item.Subject, value: item.SubjectId };
    this.subjectOptions = [{ label: item.Subject, value: item.SubjectId }];
    this.student = { label: item.Student, value: item.StudentId };
    this.studentOptions = [{ label: item.Student, value: item.StudentId }];
    this.class = { label: item.Class, value: item.ClassId };
    this.classOptions = [{ label: item.Class, value: item.ClassId }];
    this.section = { label: item.Section, value: item.SectionId };
    this.sectionOptions = [{ label: item.Section, value: item.SectionId }];
    this.examDate = item.Date;
    this.examType = { label: item.ExamName, value: item.ExamTypeId };
    this.examTypeOptions = [{ label: item.ExamName, value: item.ExamTypeId }];
  }

  onDelete(item) {

  }

  onClear(type) {
    if(type === 1) {
      this._resultForm.reset();
      this.disableSubject = true;
    } else {
      this.student = null;
      this.studentOptions = [];
    }
  }
}
