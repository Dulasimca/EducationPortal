import { Component, OnInit } from '@angular/core';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import{FileUploadConstant} from 'src/app/Common-Module/file-upload-constant';
@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
  images: any[];
  login_user: User
  data: any = [];
  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  constructor(private restApiService: RestAPIService, private authService: AuthService) { }

  ngOnInit() {
    this.login_user = this.authService.UserInfo;
const params={
'SchoolID': this.login_user.schoolId
}


    this.restApiService.getByParameters(PathConstants.Gallery_Get, params).subscribe(res => {
      if(res !== null && res !== undefined && res.length !==0) {
        res.forEach(element => {
          element.previewImageSrc='../../assets/layout/' + FileUploadConstant.Galleryfolder +'/'+element.previewImageSrc;
          element.thumbnailImageSrc='../../assets/layout/' + FileUploadConstant.Galleryfolder +'/'+element.thumbnailImageSrc;
        });
        this.images = res;
      }
    });

  //   this.images= [
  //     {
  //       'previewImageSrc': '../../assets/layout/SchoolImage/1.jpg',
  //       'thumbnailImageSrc': '../../assets/layout/SchoolImage/1.jpg',
  //       'alt': 'Description for Image 1',
  //       'title': 'Title 1'
  //   },
  //   {
  //     'previewImageSrc': '../../assets/layout/SchoolImage/2.jpg',
  //     'thumbnailImageSrc': '../../assets/layout/SchoolImage/2.jpg',
  //       'alt': 'Description for Image 2',
  //       'title': 'Title 2'
  //   },
  //   {
  //     'previewImageSrc': '../../assets/layout/SchoolImage/3.jpg',
  //     'thumbnailImageSrc': '../../assets/layout/SchoolImage/3.jpg',
  //       'alt': 'Description for Image 3',
  //       'title': 'Title 3'
  //   },
  //   {
  //     'previewImageSrc': '../../assets/layout/SchoolImage/28.jpg',
  //     'thumbnailImageSrc': '../../assets/layout/SchoolImage/28.jpg',
  //       'alt': 'Description for Image 4',
  //       'title': 'Title 4'
  //   },
  //   {
  //     'previewImageSrc': '../../assets/layout/SchoolImage/5.jpg',
  //     'thumbnailImageSrc': '../../assets/layout/SchoolImage/5.jpg',
  //       'alt': 'Description for Image 5',
  //       'title': 'Title 5'
  //   },
  //   {
  //     'previewImageSrc': '../../assets/layout/SchoolImage/33.jpg',
  //     'thumbnailImageSrc': '../../assets/layout/SchoolImage/33.jpg',
  //       'alt': 'Description for Image 6',
  //       'title': 'Title 6'
  //   }
  
  //   ]
   }

}
