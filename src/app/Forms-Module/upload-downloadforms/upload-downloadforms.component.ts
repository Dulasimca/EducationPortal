import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { ViewChild} from '@angular/core';
import { saveAs as importedSaveAs} from "file-saver";  
import { FileService} from '../../Services/uploadfile.service'
import { Validators,FormBuilder} from '@angular/forms';  

@Component({
  selector: 'app-upload-downloadforms',
  templateUrl: './upload-downloadforms.component.html',
  styleUrls: ['./upload-downloadforms.component.css']
})
export class UploadDownloadformsComponent implements OnInit {

  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private http: HttpClient) { }
  ngOnInit() {
  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('http://localhost:7440/api/Upload/AddFileDetails', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }
//   @ViewChild('resumeInput', {  
//     static: true  
// }) resumeInput;  
// @ViewChild('logoInput', {  
//     static: true  
// }) logoInput;  
// selectedFile: File = null;  
// imageUrl: string;  
// fileToUpload: File = null;  
// saveFileForm: any;  
// lstFileDetails: any;  
// constructor(private service: FileService, private formBuilder: FormBuilder) {}  
// ngOnInit(): void {  
//     this.imageUrl = './assets/blank-profile.png';  
//     this.saveFileForm = this.formBuilder.group({  
//         UserName: ['', [Validators.required]]  
//     });  
//     this.service.getFiles().subscribe(result => {  
//         this.lstFileDetails = result;  
//     })  
// }  
// downloadDocFile(data) {  
//     const DocFileName = data.DocFile;  
//     var DocFile = DocFileName.slice(0, -5);  
//     this.service.downloadFile(DocFile).subscribe((data) => {  
//         importedSaveAs(data, DocFile)  
//     });  
// }  
// onSelectFile(file: FileList) {  
//     this.fileToUpload = file.item(0);  
//     var reader = new FileReader();  
//     reader.onload = (event: any) => {  
//         this.imageUrl = event.target.result;  
//     }  
//     reader.readAsDataURL(this.fileToUpload);  
// }  
// downloadImage(data) {  
//     const ImageName = data.ImageName;  
//     var image = ImageName.slice(0, -4);  
//     this.service.downloadImage(image).subscribe((data) => {  
//         importedSaveAs(data, image)  
//     });  
// }  
// onExpSubmit() {  
//     debugger;  
//     if (this.saveFileForm.invalid) {  
//         return;  
//     }  
//     let formData = new FormData();  
//     formData.append('ImageUpload', this.logoInput.nativeElement.files[0]);  
//     formData.append('FileUpload', this.resumeInput.nativeElement.files[0]);  
//     formData.append('UserName', this.saveFileForm.value.UserName);  
//     this.service.AddFileDetails(formData).subscribe(result => {});  
// }  
  // constructor() { }

  // ngOnInit(): void {
  // }

}
