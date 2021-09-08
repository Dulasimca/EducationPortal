import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fee-form',
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.css']
})
export class FeeFormComponent implements OnInit {
  dueDate: Date = new Date();
  receiptbook: string;
  feename: string;
  actualamount: string;
  paidamount: string;
  outstanding: string;
  paying: string;
  fine: string;
 

  constructor() { }

  ngOnInit(): void {
  }

  onFileUpload($event, id) {
    console.log('eve', $event);
    const reader = new FileReader();
    var selectedFile = $event.target.files[0];
    console.log('file', selectedFile);
  }

  onSubmit() {

  }

}
