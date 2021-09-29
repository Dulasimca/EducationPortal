import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { MasterService } from 'src/app/Services/master-data.service';
import { RestAPIService } from 'src/app/Services/restAPI.service';

@Component({
  selector: 'app-questionbank',
  templateUrl: './questionbank.component.html',
  styleUrls: ['./questionbank.component.css']
})
export class QuestionbankComponent implements OnInit {
  selectedYear: number;
  yearOptions: SelectItem[];
  data: any;
  link: any;
  years?: any;
  logged_user: User;
  
  constructor(private restApiService: RestAPIService, private authService: AuthService,
    private messageService: MessageService, private masterService: MasterService) { }

  ngOnInit() {
    this.logged_user = this.authService.UserInfo;
    this.years = this.masterService.getAccountingYear();
   }

  onSelect() {
    let yearSelection = [];
    this.years.forEach(y => {
      yearSelection.push({ label: y.ShortYear, value: y.Id });
    })
    this.yearOptions = yearSelection;
    this.yearOptions.unshift({ label: '-select-', value: null });
  }

  onLoad() {
    const params = {
      'Classcode': this.logged_user.classId,
      'QuestionYear': this.selectedYear,
      'SchoolID': this.logged_user.schoolId
    }
    this.restApiService.getByParameters(PathConstants.Question_Bank_Get, params).subscribe(res => {
      if(res.length !== 0 && res !== undefined && res !== null) {
      this.data = res;
      } else {
        this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          });
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 0 || err.status === 400) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        })
      }
    })
  }
}