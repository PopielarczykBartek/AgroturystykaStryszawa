import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Photo } from '../models/photo';
import { AuthService } from '../_services/auth.service';
import { PhotoService } from '../_services/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  @Input() photos: Photo[];
  @Input() idCat;


  constructor(private photoService: PhotoService,
              private authService: AuthService
               ) { }

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.photoUrl;

  ngOnInit() {
    this.photoService.getPhotos(this.idCat).then(x => {
      this.photos = x;
    });
    this.intializeUploader(this.idCat);
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  intializeUploader(idCat: number): any{
    this.uploader = new FileUploader({
      url: this.baseUrl + '?userId=' + this.authService.decodedToken.nameid + '&idCategory=' + idCat,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false;};

    this.uploader.onSuccessItem = (item, response, status, headers) =>{
      if(response){
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
          categories: res.categories
        };
        this.photos.push(photo);
      }
    };
  }


}