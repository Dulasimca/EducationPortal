import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SelectItem } from 'primeng/api';
import { User } from 'src/app/Interfaces/user';
import { MasterService } from 'src/app/Services/master-data.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-question-bank-upload-form',
  templateUrl: './question-bank-upload-form.component.html',
  styleUrls: ['./question-bank-upload-form.component.css']
})
export class QuestionBankUploadFormComponent implements OnInit {
  subjectOptions: SelectItem[];
  subject: string;
  yearOptions: SelectItem[];
  year: string;
  description: string;
  classOptions: SelectItem[];
  class: string;
  mediumOptions: SelectItem[];
  medium: string;
  publishDate: Date;
  mediums?: any;
  classes?: any;
  years?: any;
  logged_user: User;
  @ViewChild('fileSelector', { static: false }) fileSelector: ElementRef;
  @ViewChild('f', { static: false }) _testForm: NgForm;
  @BlockUI() blockUI: NgBlockUI;
  public formData = new FormData();

  constructor(private masterService: MasterService) { }

  ngOnInit(): void {
    this.classes = this.masterService.getMaster('C');
    this.mediums = this.masterService.getMaster('M');
    this.years = this.masterService.getAccoutingYear();
  }

  onSelect(type) {
    let classSelection = [];
    let yearSelection = [];
    switch (type) {
      case 'Y':
        this.years.forEach(y => {
          yearSelection.push({ label: y.ShortYear, value: y.Id });

        })
        this.yearOptions = yearSelection;
        this.yearOptions.unshift({ label: '-select-', value: null });
        break;
      case 'C':
        this.classes.forEach(c => {
          classSelection.push({ label: c.name, value: c.code })
        });
        let sortedClass = _.sortBy(classSelection, 'value');
        this.classOptions = sortedClass;
        this.classOptions.unshift({ label: '-select', value: null });
        break;
    }
  }

  uploadData($event) { }

  onUpload() { }

}
