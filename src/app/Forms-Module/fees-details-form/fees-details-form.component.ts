import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-fees-details-form',
  templateUrl: './fees-details-form.component.html',
  styleUrls: ['./fees-details-form.component.css']
})
export class FeesDetailsFormComponent implements OnInit {
  feeTypeOptions: SelectItem[];
  feeType: string;
  dueDate: Date = new Date();
  totalAmount: any;
  paidAmount: any;
  outstandingAmount: any;
  fineAmount: any;
  payingAmount: any;

  constructor() { }

  ngOnInit(): void {
    this.feeTypeOptions = [
      { label: 'Mide-Term - I Fees', value: 'M1'},
      { label: 'Mide-Term - II Fees', value: 'M2'},
      { label: 'Mide-Term - III Fees', value: 'M3'},
    ]
  }

  onDownload() { }

  onSave() { }

}
