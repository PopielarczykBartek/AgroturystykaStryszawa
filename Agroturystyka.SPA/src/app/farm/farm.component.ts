import { Component, OnInit } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Photo } from '../models/photo';
import { AuthService } from '../_services/auth.service';
import { PhotoService } from '../_services/photo.service';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit {

  photos: Photo[];  
  isReady = false;
  idCategory = "3";

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private photoService: PhotoService,
              private authService: AuthService) { }

  ngOnInit() {
      this.photoService.getPhotos(3).then(x => {
        this.photos = x;
        this.setGalleryOptions();
      });
    }

    loggedIn(): any{
      return this.authService.loggedIn();
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
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    this.isReady = true;
    this.galleryImages = this.getImages();
  }

}