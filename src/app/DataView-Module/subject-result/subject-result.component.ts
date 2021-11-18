import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { User } from 'src/app/Interfaces/user';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant'
import { ConfirmationService, SelectItem } from 'primeng/api';
import { saveAs } from 'file-saver';
import { Dialog } from 'primeng/dialog';
import { MasterService } from 'src/app/Services/master-data.service';

@Component({
  selector: 'app-subject-result',
  templateUrl: './subject-result.component.html',
  styleUrls: ['./subject-result.component.css']
})
export class SubjectResultComponent implements OnInit {
  years?: any;
  yearOptions: SelectItem[];
  selectedYear: number;
  data: any = [];
  display: boolean = false;
  StudentAnswersheet: string;
  TeacherAnswerSheet: string;
  // studentName: string;
  // class: any;
  // rollNo: any;
  // login_user: User;
  @ViewChild('dialog', { static: false }) _dialogPane: Dialog;

  constructor(private masterService: MasterService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.years = this.masterService.getAccountingYear();
    this.StudentAnswersheet = "StudentAnswersheet.pdf"
    this.TeacherAnswerSheet = "TeacherAnswerSheet.pdf"
    var data = [];
    if(this.years.length !== 0) {
      this.years.forEach(y => {
       data.push({ label: y.ShortYear, value: y.Id });
      })
      this.yearOptions = data;
      this.selectedYear = data[0].value;
     // this.loadResult();
    }
    this.data = [{ 'slno': 1, 'subject': 'Tamil', 'test': 'Quarterly Exam' },
    { 'slno': 2, 'subject': 'English', 'test': 'Quarterly Exam' },
    { 'slno': 3, 'subject': 'Maths', 'test': 'Quarterly Exam' },
    { 'slno': 4, 'subject': 'Science', 'test': 'Quarterly Exam' },
    { 'slno': 5, 'subject': 'Social Science', 'test': 'Quarterly Exam' },
    { 'slno': 6, 'subject': 'Tamil', 'test': 'Half Yearly Exam' },
    { 'slno': 7, 'subject': 'English', 'test': 'Half Yearly Exam' },
    { 'slno': 8, 'subject': 'Maths', 'test': 'Half Yearly Exam' },
    { 'slno': 9, 'subject': 'Science', 'test': 'Revision Exam one' },
    { 'slno': 10, 'subject': 'Social Science', 'test': 'Revision Exam one' },
    { 'slno': 11, 'subject': 'Tamil', 'test': 'Revision Exam Two' },
    { 'slno': 12, 'subject': 'English', 'test': 'Revision Exam Two' },
    { 'slno': 13, 'subject': 'Maths', 'test': 'Revision Exam Three' },
    { 'slno': 14, 'subject': 'Science', 'test': 'Model Exam' },
    { 'slno': 15, 'subject': 'Social Science', 'test': 'Model Exam' }
    ]
  }

  onSelect() {
    let yearSelection = [];
    this.years.forEach(y => {
      yearSelection.push({ label: y.ShortYear, value: y.Id });

    })
    this.yearOptions = yearSelection;
    this.yearOptions.unshift({ label: '-select-', value: null });
  }

  onView() {
    this.display = true;
    this._dialogPane.showHeader = false;
  }
  onDownload(Filename) {
    console.log('inside')
    this.confirmationService.confirm({
      message: 'Do you want to download?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const path = "../../assets/layout/" + FileUploadConstant.SubjectResultfolder + "/" + Filename;
        saveAs(path, Filename);
      },
      reject: (type) => { }
    });
  }
}





