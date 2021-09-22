import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { saveAs } from 'file-saver';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Interfaces/user';
import { MasterService } from 'src/app/Services/master-data.service';
import * as _ from 'lodash';
import { Question } from 'src/app/Helper-Module/question';
import { Option } from 'src/app/Helper-Module/option';
import * as XLSX from 'xlsx';
import { NgForm } from '@angular/forms';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { HttpErrorResponse } from '@angular/common/http';
import { ExcelService } from 'src/app/Services/excel.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-test-details-form',
  templateUrl: './test-details-form.component.html',
  styleUrls: ['./test-details-form.component.css']
})

export class TestDetailsFormComponent implements OnInit {
  RowId: any = 0;
  subjectOptions: SelectItem[];
  subject: string;
  testDate: Date = new Date();
  questionTypeOptions: SelectItem[];
  questionType: string;
  totalMarks: any;
  totalDuration: any;
  testNameOptions: SelectItem[];
  testName: string;
  classOptions: SelectItem[];
  class: string;
  description: string;
  durationTypeOptions: SelectItem[];
  durationType: string;
  fileName: string;
  cell_range: number;
  login_user: User;
  classes?: any;
  questions: Question[] = [];
  options: Option[] = [];
  @ViewChild('fileSelector', { static: false }) fileSelector: ElementRef;
  @ViewChild('f', { static: false }) _testForm: NgForm;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private authService: AuthService, public masterService: MasterService,
    private restApiService: RestAPIService, private messageService: MessageService,
    private excelService: ExcelService) { }

  ngOnInit(): void {
    this.login_user = this.authService.UserInfo;
    this.classes = this.masterService.getMaster('C');
    this.durationTypeOptions = [
      { label: '-select-', value: null },
      { label: 'Mins', value: 1 },
      { label: 'Hrs', value: 2 }
    ];
    this.questionTypeOptions = [
      { label: '-select-', value: null },
      { label: 'Multiple Choice', value: 1 }
    ];
    this.subjectOptions = [
      { label: '-select-', value: null },
      { label: 'Tamil', value: 1 },
      { label: 'English', value: 2 },
      { label: 'Maths', value: 3 },
      { label: 'Science', value: 4 },
      { label: 'Social Science', value: 5 },
    ];
    this.testNameOptions = [
      { label: '-select-', value: null },
      { label: 'First Term Test', value: 'First Term Test' },
      { label: 'Mid Term Test', value: 'Mid Term Test' },
      { label: 'Cyclic Test', value: 'Cyclic Test' },
      { label: 'Model Test', value: 'Model Test' },
      { label: 'Class Test', value: 'Class Test' },
    ];
  }

  onSelect() {
    let classSelection = [];
    this.classes.forEach(c => {
      classSelection.push({ label: c.name, value: c.code })
    });
    let sortedClass = _.sortBy(classSelection, 'value');
    this.classOptions = sortedClass;
    this.classOptions.unshift({ label: '-select', value: null });
  }

  uploadData($event) {
    let filesData = $event.target.files;
    this.excelService.parseExcel(filesData[0]);
    setTimeout(
      () => {
        this.excelService.getData().then(res => {
         this.constructQuestion(res);
        })
      }, 1000
    )
    
  }

  constructQuestion(data) {
      data.forEach((q: any, index) => {
        if (q.Question !== undefined) {
          this.options = [];
          this.questions.push({
            questionId: 0,
            questionTypeId: this.questionType,
            questionName: q.Question.toString(),
            options: this.options,
            answered: false
          })
        } else if (q.Option !== undefined) {
          this.options.push({
            optionId: 0,
            questionId: 0,
            optionName: q.Option.toString(),
            isAnswer: q.Answer,
            selected: false
          })
          let index: number = this.questions.length - 1;
          this.questions[index]['options'] = this.options;
        }
      })
  }

  onRemoveFile() {
    this.fileSelector.nativeElement.value = null;
    this.questions = [];
    this.options = [];
  }

  onSave() {
    this.blockUI.start();
    const params = {
      'RowId': this.RowId,
      'Classcode': this.class,
      'TestName': this.testName,
      'TestDescription': this.description,
      'SchoolId': this.login_user.schoolId,
      'AssessmentDate': this.testDate,
      'Questions': this.questions,
      'QuestionType': this.questionType,
      'TotalMarks': this.totalMarks,
      'TotalDuration': this.totalDuration,
      'DurationType': this.durationType,
      'SubjectId': this.subject,
      'Flag': 1,
    };
    this.restApiService.post(PathConstants.OnlineAssessment_Post, params).subscribe(res => {
      if(res) {
        this.blockUI.stop();
        this.onRemoveFile();
        this.onClearForm();
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
          summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.SuccessMessage
        });
      } else {
        this.blockUI.stop();
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        });
      }
    }, (err: HttpErrorResponse) => {
      this.blockUI.stop();
      if (err.status === 0 || err.status === 400) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        })
      }
    })
  }

  onDownload() {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheethtml.sheet;charset=UTF-8';
    const path = "../../assets/files/questions.xlsx";
    const filename = 'Sample_Excel' + ".xlsx";
    saveAs(path, filename);
  }

  onClearForm() {
   this._testForm.reset();
  }
}
