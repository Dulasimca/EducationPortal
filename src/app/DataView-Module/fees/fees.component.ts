import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {
  year: SelectItem[];
  receiptData: any = [];
  paymentData: any = [];
  
  constructor() { }

  ngOnInit() {
    this.year = [ {label: '2021-2022', value: '12' }, { label: '2020-2021', value: '01'}];
    this.receiptData = [
      { 'slno': 1, 'date': '02-01-2021', 'receipt': 'Tution Fee', 'feename': '1st Term Tution Fee', 'a_ammt': '1200',
    'pd_amnt': '0', 'o_amnt': '1200', 'p_amnt': '1200', 'fine': '0'},
    { 'slno': 2, 'date': '10-04-2021', 'receipt': 'Tution Fee', 'feename': '2nd Term Tution Fee', 'a_ammt': '1110',
    'pd_amnt': '0', 'o_amnt': '1110', 'p_amnt': '1110', 'fine': '0'},
    { 'slno': 3, 'date': '12-07-2021', 'receipt': 'Tution Fee', 'feename': '3rd Term Tution Fee', 'a_ammt': '995',
    'pd_amnt': '0', 'o_amnt': '995', 'p_amnt': '995', 'fine': '0'},
    { 'slno': 4, 'date': '21-10-2021', 'receipt': 'Tution Fee', 'feename': '4th Term Tution Fee', 'a_ammt': '800',
    'pd_amnt': '0', 'o_amnt': '800', 'p_amnt': '800', 'fine': '0'},
    ];
    this.paymentData = [
      { 'slno': 1, 'date': '02-01-2021', 'method' : 'Online' , 'amount' : '1000' , 'number' : 'ER-2021-22-372'},
      { 'slno': 2, 'date': '21-03-2021', 'method' : 'Online' , 'amount' : '1800' , 'number' : 'TF-2021-28-367'},
      { 'slno': 3, 'date': '15-05-2021', 'method' : 'Online' , 'amount' : '2500' , 'number' : 'TF-2021-72-379'},

    ];
  }
}
