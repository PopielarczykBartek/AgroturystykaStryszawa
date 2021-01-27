import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Photo } from '../models/photo';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {


constructor(private http: HttpClient) { }

getPhotos(categoryId: number): Promise<Photo[]>{
return this.http.get<Photo[]>(environment.photoUrl + 'getPhotos?IdCategory=' + categoryId).toPromise();
}

getMainPhotos(): Promise<Photo[]>{
  return this.http.get<Photo[]>(environment.photoUrl + 'GetMainPhotos').toPromise();
}

setMainPhoto(userId: number, id: number, isMain: boolean){
  return this.http.post(environment.photoUrl + 'SetMainPhoto?userId=' + userId + '&id=' + id + '&isMain=' + isMain, {});
}

deletePhoto(userId: number, id:number){
  return this.http.delete(environment.photoUrl + 'DeletePhoto?userId=' + userId + '&id='+ id);
}

}
