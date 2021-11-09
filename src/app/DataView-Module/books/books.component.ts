import { Component, OnInit } from '@angular/core';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant'
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/Interfaces/user';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  MRowId = 0
  data: any = [];
  cols: any;
  books: any = [];
  login_user: User;
  constructor(private restApiService: RestAPIService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private authService: AuthService) { }

  ngOnInit() {
    this.login_user = this.authService.UserInfo;
    this.cols = [
      { field: 'Years', header: 'Year' },
      { field: 'subjects', header: 'Subject' },
      { field: 'authorReference', header: 'Author/Reference', width: '300px' },
      { field: 'CreatedDate', header: 'Published date' },
    ];
    this.loadBooks()
  }

  loadBooks() {
    this.data = [];
    const params = {
      'SchoolID': this.login_user.schoolId,
      'ClassId': this.login_user.classId
    }
    this.restApiService.getByParameters(PathConstants.Book_Get, params).subscribe(res => {
      if (res !== null && res !== undefined && res.length !== 0) {
        this.data = res;
      } else {
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
        const path = "../../assets/layout/" + FileUploadConstant.Booksfolder + "/" + Filename;
        saveAs(path, Filename);
      },
      reject: (type) => { }
    });
  }
}
