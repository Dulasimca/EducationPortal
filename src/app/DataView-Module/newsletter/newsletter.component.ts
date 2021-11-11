import { Component, OnInit } from '@angular/core';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { saveAs } from 'file-saver';
import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant'
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableConstants } from 'src/app/Common-Module/TableConstants';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { ResponseMessage } from 'src/app/Common-Module/Message';

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
  constructor(private restApiService: RestAPIService, private authService: AuthService,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.logged_user = this.authService.UserInfo;
    this.cols = TableConstants.NewsLetterColumns;
    this.onview()
  }

  onview() {
    this.data = [];
    this.loading = true;
    const params = {
      'SchoolID': this.logged_user.schoolId,
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


