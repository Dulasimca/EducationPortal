import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant'
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableConstants } from 'src/app/Common-Module/TableConstants';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  data: any = [];
  cols: any;
  loading: boolean;

  constructor(private restApiService: RestAPIService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private datepipe: DatePipe) { }

  ngOnInit() {
    this.cols = TableConstants.AnnouncementsColumns;
    this.onView()
  }
  onDownload(Filename) {
    this.confirmationService.confirm({
      message: 'Do you want to download?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const path = "../../assets/layout/" + FileUploadConstant.Announcementfolder + "/" + Filename;
        saveAs(path, Filename);
      },
      reject: (type) => { }
    });

  }

  onView() {
    this.data = [];
    const params = {
      'SchoolID': 1,
    }
    this.loading = true;
    this.restApiService.getByParameters(PathConstants.Announcement_Get, params).subscribe(res => {
      if (res !== null && res !== undefined) {
        if (res.length !== 0) {
          res.forEach(x => {
            x.Announcementdate = this.datepipe.transform(x.Announcementdate, 'dd/MM/yyyy');
          })
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
      } else {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
          summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
        })
      }
    });
  }

}