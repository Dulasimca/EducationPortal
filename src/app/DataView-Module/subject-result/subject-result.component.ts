import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { User } from 'src/app/Interfaces/user';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant'
import { ConfirmationService } from 'primeng/api';
import { saveAs } from 'file-saver';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-subject-result',
  templateUrl: './subject-result.component.html',
  styleUrls: ['./subject-result.component.css']
})
export class SubjectResultComponent implements OnInit {
  years: year[];
  selectedyear: year;
  data: any = [];
  display: boolean = false;
  StudentAnswersheet: string;
  TeacherAnswerSheet: string;
  // studentName: string;
  // class: any;
  // rollNo: any;
  // login_user: User;
  @ViewChild('dialog', { static: false }) _dialogPane: Dialog;

  constructor(private restApiService: RestAPIService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    // const params = {
    //   'studentName': this.login_user.username,
    //   'class': this.login_user.class,
    //   'rollNo': this.login_user.id
    // }

    // this.restApiService.getByParameters(PathConstants.Fee_Get, params).subscribe(res => {
    //   if(res !== null && res !== undefined && res.length !== 0) {
    //     if(res) {
    //   console.log('rs',res);
    //   }
    // }
    // });
    this.StudentAnswersheet = "StudentAnswersheet.pdf"
    this.TeacherAnswerSheet = "TeacherAnswerSheet.pdf"
    this.years = [
      { name: '2021-2022', code: '2122' },
      { name: '2020-2021', code: '2021' },

    ];
    this.data = [{ 'slno': 1, 'subject': 'Tamil', 'test': 'Mid-Term Assessment' },
    { 'slno': 2, 'subject': 'English', 'test': 'Pre-Mid Term Exam' },
    { 'slno': 3, 'subject': 'Maths', 'test': 'Pre-Midterm' },
    { 'slno': 4, 'subject': 'Science', 'test': 'Pre-Midterm Examination' },
    { 'slno': 5, 'subject': 'Social Science', 'test': 'Pre-Midterm Examination' },
    { 'slno': 6, 'subject': 'french', 'test': 'Pre-Midterm Examination' },
    { 'slno': 7, 'subject': 'Hindi', 'test': 'Pre-Midterm Examination' },
    { 'slno': 8, 'subject': 'Artificial Intelligence', 'test': 'Pre-Midterm Examination' },
    ]
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

interface year {
  name: string,
  code: string
}




