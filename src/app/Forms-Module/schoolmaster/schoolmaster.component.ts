import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MasterService } from 'src/app/Services/master-data.service';
import { Profile } from 'src/app/Interfaces/profile';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { FileUploadConstant } from 'src/app/Common-Module/file-upload-constant';
import { TableConstants } from 'src/app/Common-Module/TableConstants';


@Component({
  selector: 'app-schoolmaster',
  templateUrl: './schoolmaster.component.html',
  styleUrls: ['./schoolmaster.component.css']
})
export class SchoolmasterComponent implements OnInit {

  obj: Profile = {} as Profile;
  districtOptions: SelectItem[];
  talukOptions: SelectItem[];
  curriculumOptions: SelectItem[];

  districts?: any;
  taluks?: any;
  curriculum?:any;

  login_user: User;
  
  SchoolName:any;
  SchoolAddress:any;
  SchoolPincode:any;
  DistrictId:any;
  TalukId:any;
  Schoolcode:any;
  loading: boolean;
  data: any = [];
  cols: any;
  showtable: boolean;
  RowId = 0;


  @BlockUI() blockUI: NgBlockUI;
  public progress: number;
  public message: string;
  public formData = new FormData();
  @ViewChild('f', { static: false }) _SchoolMasterForm: NgForm;

  constructor(private restApiService: RestAPIService, private datePipe: DatePipe,
    private messageService: MessageService, private masterService: MasterService,
    public _d: DomSanitizer, private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.login_user = this.authService.UserInfo;
    this.cols = TableConstants.SchoolMasterFormColumns;
    this.masterService.getMaster('');
    // this.curriculumOptions = [
    //   { label: 'Stateboard', value: '01' },
    //   { label: 'CBSE', value: '02' },
    // ]
  }
  onSelect(type) {
    this.districts = this.masterService.getMaster('D');
    this.taluks = this.masterService.getMaster('T');
    this.curriculum =this.masterService.getMaster('CL');

    let districtSelection = [];
    let talukSelection = [];
    let curriculumSelection = [];
    
    switch (type) {
      case 'D':
      this.districts.forEach(d => {
        districtSelection.push({ label: d.name, value: d.code })
      });
      this.districtOptions = districtSelection;
      this.districtOptions.unshift({ label: '-select', value: null });
      break;
      case 'T':
        this.taluks.forEach(T => {
          talukSelection.push({ label: T.name, value: T.code })
        });
        this.talukOptions = talukSelection;
        this.talukOptions.unshift({ label: '-select', value: null });
        break;
        case 'CL':
          this.curriculum.forEach(c => {
            curriculumSelection.push({ label: c.name, value: c.code })
          });
          this.curriculumOptions = curriculumSelection;
          this.curriculumOptions.unshift({ label: '-select', value: null });
          break;
  }

    }
  

  onSave(){
    this.blockUI.start();
    const params = {
      'Districcode': this.DistrictId,
      'Talukcode': this.TalukId,
      'Catagorycode': this.curriculum,
      'Schoolcode': this.RowId,
      'Schoolname': this.SchoolName,
      'Schooladd': this.SchoolAddress,
      'Schoolpincode': this.SchoolPincode,
      'Flag': 1,
    };
    console.log(params)
    this.restApiService.post(PathConstants.SchoolMaster_Post, params).subscribe(res => {
      if (res !== undefined && res !== null) {
        if (res) {
          this.blockUI.stop();
          //this.onView();
         // this.onClear();
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
      } 
      else {
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

  onView() {
    this.data = [];
    this.showtable = true;
   // this.loading = true;
    const params = { 
      'Districcode': this.DistrictId,
      'Talukcode': this.TalukId,
      
    }
    this.restApiService.getByParameters(PathConstants.SchoolMaster_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !==0) {
        //this.loading = false;
        this.data = res;
        this.showtable = true;
      }else {
        this.loading = false;
        this.showtable = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_WARNING,
         // summary: ResponseMessage.SUMMARY_WARNING, detail: ResponseMessage.NoRecordMessage
          summary: ResponseMessage.SUMMARY_WARNING, detail: 'Please select District and Taluk !'
        });
      }
      
    })
  }


  onClear() {
    this._SchoolMasterForm.reset();
    this._SchoolMasterForm.form.markAsUntouched();
    this._SchoolMasterForm.form.markAsPristine();
    this.DistrictId = null;
    this.TalukId = null;
    this.curriculum = null;
    this.Schoolcode = null;
    this.SchoolName = null;
    this.SchoolAddress = null;
    this.SchoolPincode = null;
    this.RowId = 0;
    //this.onView();
    // if (this._attachment.nativeElement.files.length !== 0) {
    //   this._attachment.nativeElement.value = null;
    // }
  }
  // onRowSelect(event, selectedRow){

  // }
  onEdit(selectedRow) {
     if (selectedRow !== undefined && selectedRow !== null) {
      this.RowId = selectedRow.Schoolcode; 
      this.DistrictId = selectedRow.Districcode;
      this.districtOptions = [{ label: selectedRow.Districname, value: selectedRow.Districcode }];
      this.TalukId = selectedRow.TalukId;
      this.talukOptions = [{ label: selectedRow.Talukname, value: selectedRow.Talukcode }];
      this.curriculum = selectedRow.Catagorycode;
      this.curriculumOptions = [{ label: selectedRow.Name, value: selectedRow.Catagorycode }];
      this.SchoolName = selectedRow.Schoolname;
      this.SchoolAddress = selectedRow.Schooladd;
      this.SchoolPincode = selectedRow.Schoolpincode;
     }

  }
  onDelete(index) {
    this.blockUI.start();
    if (index !== null && index !== undefined) {
      this.restApiService.put(PathConstants.SchoolMaster_Delete, index).subscribe(res => {
        if (res !== undefined && res !== null) {
          if (res) {
            this.blockUI.stop();
            this.onView();
            this.messageService.clear();
            this.messageService.add({
              key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
              summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.DeleteSuccessMsg
            });
          } else {
            this.blockUI.stop();
            this.messageService.clear();
            this.messageService.add({
              key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
              summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.DeleteFailMsg
            });
          }
        } else {
          this.blockUI.stop();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          });
        }
      }, (err: HttpErrorResponse) => {
        this.loading = false;
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
  }
  

