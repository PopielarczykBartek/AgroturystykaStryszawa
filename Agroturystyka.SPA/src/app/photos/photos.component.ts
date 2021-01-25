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

  constructor(private photoService: PhotoService,
              private authService: AuthService) { }

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.photoUrl;

  ngOnInit() {
    this.photoService.getPhotos(1).then(x => {
      this.photos = x;
    });
    this.intializeUploader(1);
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  intializeUploader(idCat: number): any{
    this.uploader = new FileUploader({
      url: this.baseUrl + '?userId=' + this.authService.decodedToken.nameid + '?idCategory=' + idCat,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
  }


}