import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Photo } from '../models/photo';
import { PhotoService } from '../_services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  
  photos: Photo[];  
  isReady = false;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];


  constructor(private http: HttpClient,
              private photoService: PhotoService) { }

  ngOnInit(): any {
    this.photoService.getMainPhotos().then(x => {
      this.photos = x;
      this.setGalleryOptions();
    });
  
  }

  registerToggle(): void{
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean): void{
    this.registerMode = registerMode;
  }



  getImages() {
    const imagesUrls = [];
    for (let i = 0; i < this.photos.length; i++) {
      imagesUrls.push({
        small: this.photos[i].url,
        medium: this.photos[i].url,
        big: this.photos[i].url,
        description: this.photos[i].description
      });
    }
    return imagesUrls;
  }

  setGalleryOptions(){
    this.galleryOptions = [
      { 
        imageAutoPlay: true, 
        imageAutoPlayPauseOnHover: true,
        previewAutoPlay: true,
        previewAutoPlayPauseOnHover: true ,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        width: '600px',
        height: '600px',
      },
      {
        breakpoint: 800, 
        width: "600px", 
        height: "600px", 
        thumbnailsColumns: 3
     },
      { 
        breakpoint: 800,
        width: "100%",
        height: "100%",
       thumbnailsColumns: 2
       }
      ] 

    this.isReady = true;
    this.galleryImages = this.getImages();
  }

}
