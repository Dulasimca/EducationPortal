import { Component, OnInit } from '@angular/core';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant'
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  MRowId=0 
  data: any = [];
  cols: any;
  books : any = []
  constructor(private restApiService: RestAPIService, private http: HttpClient,private confirmationService: ConfirmationService) { }

  ngOnInit() {
    
    this.cols = [
      //{field: 'RowId',header: 'ID'},
      {field: 'Years',header: 'Year'},
      {field: 'Class2',header:'Class'},
      {field:'subjects',header: 'Subject'},
      {field: 'authorReference',header: 'Author/Reference', width: '300px'},
      //{field: 'Pdffilename',header: 'Book Download'},
      {field: 'CreatedDate',header: 'Published date'},
      
      
    ];
    this.onview()
  }
  onview() {
    this.data = [];
    const params = { 
      'SchoolID': 1,
    }
    
    this.restApiService.getByParameters(PathConstants.Book_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !==0) {
        this.data = res;
      }
      
    })
}
onDownload(Filename) {
  this.confirmationService.confirm({
    message: 'Do you want to download?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
  //const path = 'D:/Angular Project/EducationPortalAPI/Resources/Books';
  const path = "../../assets/layout/"+FileUploadConstant.Booksfolder+"/"+Filename;
  //const filename = 'files' + ".pdf";
  saveAs(path, Filename);
},
reject: (type) => { }
});

}
}


interface FolderOptions {
  FolderPath?: string;
}

