import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})

export class ExcelService {
  excelData?: any;

  public async parseExcel(file) {
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      var arrayBuffer: any = fileReader.result;
      var data = new Uint8Array(arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.setData(arraylist);
    }
  }

  setData(data) {
    this.excelData = data;
  }

  async getData(): Promise<any> {
    return Promise.resolve(this.excelData);
  }
}