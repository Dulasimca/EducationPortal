import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';

import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant'
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { TableConstants } from 'src/app/Common-Module/TableConstants';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-circular',
  templateUrl: './circular.component.html',
  styleUrls: ['./circular.component.css']
})
export class CircularComponent implements OnInit {
  MRowId = 0
  data: any = [];
  cols: any;
  logged_user: User;
  loading: boolean;

  constructor(private restApiService: RestAPIService, private authService: AuthService,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.cols = TableConstants.CircularColumns;
    this.logged_user = this.authService.UserInfo;
    this.onview();
  }

  onview() {
    this.data = [];
    this.loading = true;
    const params = {
      'SchoolID': this.logged_user.schoolId,
    }
    this.restApiService.getByParameters(PathConstants.Circular_Get, params).subscribe(res => {
      if (res !== null && res !== undefined && res.length !== 0) {
        this.data = res;
        this.loading = false;
      } else {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        });
      }
    })
  }

  onDownload(Filename) {
    this.confirmationService.confirm({
      message: 'Do you want to download?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //const path = 'D:/Angular Project/EducationPortalAPI/Resources/Books';
        const path = "../../assets/layout/" + FileUploadConstant.Circularfolder + "/" + Filename;
        //const filename = 'files' + ".pdf";
        saveAs(path, Filename);
      },
      reject: (type) => { }
    });
  }
}


