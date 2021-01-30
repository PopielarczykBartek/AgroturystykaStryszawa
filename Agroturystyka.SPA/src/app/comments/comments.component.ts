import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { CommentService } from '../_services/comment.service';
import { Comment } from '../models/comment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  baseUrl = environment.comment + 'getComments';

  constructor(private commentService: CommentService,
              private alertify: AlertifyService,
              private httpClient: HttpClient) { }

  model: any = {};

  comments: Comment[];

  ngOnInit() {
    this.getComments();
  }

  comment(): any{
    this.commentService.AddComment(this.model).subscribe(() => {
      this.alertify.success('Komentarz dodany!');
      this.model = {};
    }, error => {
        this.alertify.error('Wystąpił błąd podczas dodawania komenatrza');
    });
  }

  getComments(): void{
    this.commentService.getComments().subscribe((com: Comment[]) =>{
      this.comments = com;
    })
    
  }




}
