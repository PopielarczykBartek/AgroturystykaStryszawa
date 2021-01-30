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





//getComment(): Promise<Comment[]>{
 // return this.http.get<Comment[]>(environment.comment + 'getComments').toPromise();
//}

//getComments(): Observable<Comment[]>{
 /// return this.http.get(this.baseUrl + 'getComments').map((response: Response =>{
 //   return response.json();
//  }))
//}

//public getComments(): Observable<Comment[]> {
 // return this.http.get(this.baseUrl + 'getComments')
 // .map((response: Response) => {
 //   return response.json
  //})
 // .catch(this.handleError);
//}


//handleError (error: Response | any) {
  //let errMsg: string;
  
  //if (error instanceof Response) {
  //  const body: any = error.json() || '';
  //  const err = body.error || JSON.stringify(body);
  //  errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
 // } else {
   // errMsg = error.message ? error.message : error.toString();
 //}
  
  //console.error(errMsg);
 // return Observable.throw(errMsg);
//}



}
