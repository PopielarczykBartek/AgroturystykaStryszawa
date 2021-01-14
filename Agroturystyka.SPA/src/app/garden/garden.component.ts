import { Component, OnInit } from '@angular/core';
import { Gallery } from 'angular-gallery';
import { User } from '../models/user';
//import { CarouselComponent } from 'angular-gallery/lib/c';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.scss']
})
export class GardenComponent implements OnInit {

  user: User;

  constructor(public gallery: Gallery,) { }

  ngOnInit() {
  }

  showGallery(index: number = 0): any{
    let prop: any = {};
    //prop.component = CarouselComponent;
    prop.images = [
      {path: '../../assets/1.jpg'},
      {path: '../../assets/2.jpg'},
      {path: '../../assets/3.jpg'},
      {path: '../../assets/4.jpg'},
    ];
    prop.index = index;
    this.gallery.load(prop);
  }

  closeGallery(){
    this.gallery.close();
  }

  getImages(){
    const imagesUrls = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      imagesUrls.push({
        path: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }
    return imagesUrls;
  }

}
