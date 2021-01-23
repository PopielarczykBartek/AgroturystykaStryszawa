import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Category } from '../models/category';
import { Photo } from '../models/photo';
import { User } from '../models/user';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.scss']
})
export class GardenComponent implements OnInit {

  user: User;
  photos: Photo[];
  categories: Category;
  
  isReady = false;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
  ////  this.userService.getUser(this.authService.getUserId()).subscribe(data => {
    //  console.log(data);
     // this.user = data;
     // if(this.user = data.user){
      //this.setGalleryOptions();
    //  }
    this.setGalleryOptions()
    }
    //)

  //}

  idCat: number = 1;

  getImages() {
    const imagesUrls = [];
    for (let i = 0; i < this.photos.length; i++) {
      imagesUrls.push({
        small: this.photos[i].categories.id == this.idCat,
        medium: this.photos[i].categories.id == this.idCat,
        big: this.user.photos[i].categories.id == this.idCat,
        description: this.user.photos[i].description
      });
    }
    return imagesUrls;
  }
  
  setGalleryOptions(){
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide
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
