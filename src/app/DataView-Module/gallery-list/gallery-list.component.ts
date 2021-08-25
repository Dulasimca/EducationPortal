import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
  images: any[];
   
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
  constructor() { }

  ngOnInit() {
   
    
    this.images= [
      {
        'previewImageSrc': '../../assets/layout/SchoolImage/1.jpg',
        'thumbnailImageSrc': '../../assets/layout/SchoolImage/1.jpg',
        'alt': 'Description for Image 1',
        'title': 'Title 1'
    },
    {
      'previewImageSrc': '../../assets/layout/SchoolImage/2.jpg',
      'thumbnailImageSrc': '../../assets/layout/SchoolImage/2.jpg',
        'alt': 'Description for Image 2',
        'title': 'Title 2'
    },
    {
      'previewImageSrc': '../../assets/layout/SchoolImage/3.jpg',
      'thumbnailImageSrc': '../../assets/layout/SchoolImage/3.jpg',
        'alt': 'Description for Image 3',
        'title': 'Title 3'
    },
    {
      'previewImageSrc': '../../assets/layout/SchoolImage/28.jpg',
      'thumbnailImageSrc': '../../assets/layout/SchoolImage/28.jpg',
        'alt': 'Description for Image 4',
        'title': 'Title 4'
    },
    {
      'previewImageSrc': '../../assets/layout/SchoolImage/5.jpg',
      'thumbnailImageSrc': '../../assets/layout/SchoolImage/5.jpg',
        'alt': 'Description for Image 5',
        'title': 'Title 5'
    },
    {
      'previewImageSrc': '../../assets/layout/SchoolImage/33.jpg',
      'thumbnailImageSrc': '../../assets/layout/SchoolImage/33.jpg',
        'alt': 'Description for Image 6',
        'title': 'Title 6'
    }
  
    ]
  }

}
