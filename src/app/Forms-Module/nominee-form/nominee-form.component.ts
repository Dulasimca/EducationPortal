import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import * as _ from 'lodash';
import { MasterService } from 'src/app/Services/master-data.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { MessageService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-nominee-form',
  templateUrl: './nominee-form.component.html',
  styleUrls: ['./nominee-form.component.css']
})
export class NomineeFormComponent implements OnInit {

  date: Date = new Date();
  Classname: string;
  section: any;
  name: string;
  positionOptions:SelectItem[];
  positionSelection:SelectItem[];
  classOptions:SelectItem[];
  nameOptions:SelectItem[];
  nameSelection:any =[];
  sectionOptions:SelectItem[];
  districtOptions: SelectItem[];
  position: string;
  classes?: any;
  sections?: any;
  masterData?: any = [];
  MRowId=0;
  class: any;
 
  data: any = []; 
  cols: any;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private restApiService: RestAPIService, private http: HttpClient,
    private messageService: MessageService, private masterService: MasterService,private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.classes = this.masterService.getMaster('C');
    this.sections = this.masterService.getMaster('S');

    this.cols = [
      { field: 'RowId', header: 'ID' },
      // { field: 'NomineeID', header: 'NomineeID' },
      { field: 'ElectionDate', header: 'Election Date' },
      { field: 'ElectionName', header: 'ElectionName' },
    
   
      
    ];

    this.positionOptions = [
      { label: '-select-', value: null },
      { label: 'Class Representative', value: 'Class Representative'},
      { label: 'School Representative', value: 'School Representative'},
      
    ];
   

  }
  
  onSubmit() {
   
    const params = {
      'RowId': this.MRowId,
      'SchoolID': 1,        
      'ElectionID':1, 
      'NomineeID': 1,
      'ElectionName': this.position,
      'ElectionDate':this.datepipe.transform(this.date, 'yyyy-MM-dd') ,
      'Flag' : true

    };
        console.log(params);
    this.restApiService.post(PathConstants.Nominee_Post, params).subscribe(res => {
      if(res !== undefined && res !== null) {
        if (res) {
          this.blockUI.stop();
          this.clear();
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
        } else {
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
  onSelect(type) {
    let classSelection = [];
    let sectionSelection = [];

    switch (type) {
      case 'C': 
      this.classes.forEach(c => {
        classSelection.push({ label: c.name, value: c.code })
      });
      let sortedClass = _.sortBy(classSelection, 'value');
      this.classOptions = sortedClass;
      this.classOptions.unshift({ label: '-select', value: null });
      break;
      case 'S':
          this.sections.forEach(s => {
            sectionSelection.push({ label: s.name, value: s.code })
          });
          this.sectionOptions = sectionSelection;
          this.sectionOptions.unshift({ label: '-select', value: null });
          break;
          

}

  }
  onSelect2() {
    // let nameOptions=[];
    this.nameSelection=[];
    const params = {
      'SchoolID': 1,
      'ClassId': this.class.value, 
      'SectionId': this.section.value,
    }
    this.restApiService.getByParameters(PathConstants.Nomineeview_Get, params).subscribe(data => {
      if (data !== undefined) {
          data.forEach(y => {
          this.nameSelection.push({ 'label': y.FirstName, 'value': y.slno });
          
        });
        this.nameOptions=this.nameSelection;
      }
    })

  }
  onView() {
    const params = {
      'SchoolID': 1,
    }
    this.restApiService.getByParameters(PathConstants.Nominee_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !== 0) {
      console.log( res);
      this.data = res;
      }
    });
  

  }
  clear() {
    this.position="",
    this.classes="",
    this.sections="",
    this.name=""
  }
  onRowSelect(event, selectedRow) {
    this.MRowId=selectedRow.RowId;
    this.date=selectedRow.ElectionDate;
    this.position=selectedRow.ElectionName;
     
  }

}
