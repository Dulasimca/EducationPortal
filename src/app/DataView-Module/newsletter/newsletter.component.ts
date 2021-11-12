import { Component, OnInit } from '@angular/core';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { saveAs } from 'file-saver';
import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant'
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { TableConstants } from 'src/app/Common-Module/TableConstants';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MasterService } from 'src/app/Services/master-data.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  MRowId = 0
  data: any = [];
  cols: any;
  books: any = [];
  loading: boolean;
  logged_user: User;
  years?: any;
  yearOptions: SelectItem[];
  shortYear: number;
  months?: any = [];
  monthOptions: SelectItem[];
  month: number;
  curMonth: number;
  constructor(private restApiService: RestAPIService, private authService: AuthService,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private masterService: MasterService) { }

  ngOnInit() {
    this.logged_user = this.authService.UserInfo;
    this.years = this.masterService.getAccountingYear();
    this.cols = TableConstants.NewsLetterColumns;
    this.loadMonths();
    var data = [];
    if(this.years.length !== 0 && this.months.length !== 0) {
      this.years.forEach(y => {
       data.push({ label: y.ShortYear, value: y.Id });
      })
      this.yearOptions = data;
      this.shortYear = data[0].value;
      const curmonth = new Date().toLocaleString('default', { month: 'short' });
      this.monthOptions = [{ label: curmonth, value: this.curMonth}];
      this.month = this.curMonth;
      this.onView();
    }
  }

  loadMonths() {
    this.curMonth = new Date().getMonth()+1;
    const curmonth = new Date().toLocaleString('default', { month: 'short' });
    for(let i = 0; i < 12; i++) {
      const formDate = new Date().getFullYear() + '-' + (i + 1) + '-01';
      const monthName = new Date(formDate).toLocaleString('default', { month: 'short' });
      this.months.push({
        Name: monthName,
        Value: i + 1
      })
    }
    console.log('mnth', this.curMonth, curmonth, this.months)
  }

  onSelect(type) {
    let yearSelection = [];
    let monthSelection = [];
    switch(type) {
      case 'Y':
    this.years.forEach(y => {
      yearSelection.push({ label: y.ShortYear, value: y.Id });

    })
    this.yearOptions = yearSelection;
    this.yearOptions.unshift({ label: '-select-', value: null });
    break;
    case 'M':
      this.months.forEach(m => {
        monthSelection.push({ label: m.Name, value: m.Value });
      })
      this.monthOptions = monthSelection;
      this.monthOptions.unshift({ label: '-select', value: null });
  }
  }

  onView() {
    this.data = [];
    this.loading = true;
    const params = {
      'SchoolID': this.logged_user.schoolId,
      'Month': this.month,
      'ShortYear': this.shortYear
    }
    this.restApiService.getByParameters(PathConstants.NewsLetter_Get, params).subscribe(res => {
      if (res !== null && res !== undefined && res.length !== 0) {
        this.data = res;
        this.loading = false;
      } else {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        })
      }
    })
  }
  onDownload(Filename) {
    this.confirmationService.confirm({
      message: 'Do you want to download?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const path = "../../assets/layout/" + FileUploadConstant.Newsletterfolder + "/" + Filename;
        saveAs(path, Filename);
      },
      reject: (type) => { }
    });
  }
}


