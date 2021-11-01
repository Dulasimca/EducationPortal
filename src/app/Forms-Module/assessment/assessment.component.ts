import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmationService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { AssessmentService } from 'src/app/Services/online-test.service';
import { RestAPIService } from 'src/app/Services/restAPI.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {
  openDialog: boolean;
  @ViewChild('dialog', { static: false }) _dialogPane: Dialog;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private _confirmationService: ConfirmationService, private _restApiService: RestAPIService
    ,private _assessmentService: AssessmentService, private _router: Router) { }

  ngOnInit(): void {
    this.openDialog = false;
    var testId = this._assessmentService.getId();
    if(testId !== undefined && testId !== null) {
      this.blockUI.stop();
    this._restApiService.getByParameters(PathConstants.OnlineAssessmentCheck_Get, {'TestID': testId}).subscribe(res => {
      if(res !== undefined && res !== null) {
        if(res[0].isSubmitted) {
          this.blockUI.start('redirecting...');
          this._router.navigate(['/online-assessment']);
        } else {
          this.blockUI.stop();
        }
      }
    })
  } else {
    this.blockUI.start('redirecting...');
    this._router.navigate(['/online-assessment']);
  }
  }

  onStart() {
    this.openDialog = true;
    this._dialogPane.maximized = true;
    this._dialogPane.showHeader = false;
  }

  hide($event) {
    this._dialogPane.visible = true;
    console.log('hide')
    this._confirmationService.confirm({
      message: 'Do you want to submit the test?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {},
      reject: (type) => {}
  });
  }

}
