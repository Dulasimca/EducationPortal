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
import { TableConstants } from 'src/app/Common-Module/TableConstants';


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
  loading: boolean;
  constructor(private restApiService: RestAPIService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private authService: AuthService) { }

  ngOnInit() {
    this.login_user = this.authService.UserInfo;
    this.cols = TableConstants.MyBooksColumns;
    this.loadBooks();
  }

  loadBooks() {
    this.data = [];
    this.loading = true;
    const params = {
      'SchoolID': this.login_user.schoolId,
      'ClassId': this.login_user.classId,
      'Medium': this.login_user.mediumId
    }
    this.restApiService.getByParameters(PathConstants.Book_Get, params).subscribe(res => {
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
        const path = "../../assets/layout/" + FileUploadConstant.Booksfolder + "/" + Filename;
        saveAs(path, Filename);
      },
      reject: (type) => { }
    });
  }
}
