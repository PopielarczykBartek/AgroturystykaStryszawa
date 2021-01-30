import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment';
import { map, filter, switchMap } from 'rxjs/operators';
import { Photo } from '../models/photo';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl = environment.comment;

constructor(private http: HttpClient) { }


AddComment(model: any): any{
  return this.http.post(this.baseUrl + 'addcomment', model);
  }

getComments() {
 return this.http.get<Comment[]>(this.baseUrl + 'GetComments');
}


deleteComment(userId: number, id: number){
  return this.http.delete(environment.comment + 'DeleteComment?userId=' + userId + '&id='+id);
}




}
