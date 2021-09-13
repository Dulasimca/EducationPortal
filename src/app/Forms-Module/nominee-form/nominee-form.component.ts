import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { MessageService} from 'primeng/api';
import * as _ from 'lodash';
import { MasterService } from 'src/app/Services/master-data.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';

@Component({
  selector: 'app-nominee-form',
  templateUrl: './nominee-form.component.html',
  styleUrls: ['./nominee-form.component.css']
})
export class NomineeFormComponent implements OnInit {

  date: Date = new Date();
  Classname: string;
  section: string;
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
 
  data: any = []; 
  cols: any;

  constructor(private restApiService: RestAPIService, private http: HttpClient,
    private messageService: MessageService, private masterService: MasterService) { }

  ngOnInit(): void {
    this.classes = this.masterService.getMaster('C');
    this.sections = this.masterService.getMaster('S');

    this.cols = [
      { field: 'NomineeID', header: 'NomineeID' },
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
      'RowID': 0,
      'SchoolID': 1,        
      'ElectionID':1, 
      'NomineeID': 1,
      'ElectionName': this.position,
      'ElectionDate': this.date,
      'Flag' : true

    };
        console.log(params);
    this.restApiService.post(PathConstants.Nominee_Post, params).subscribe(res => {
     console.log('rs', res);
    });
    
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
    let nameOptions=[];
    const params = {
      'SchoolID': 1,
      'ClassId': 1,
      'SectionId': 1
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
    this.position=""
  }

}
