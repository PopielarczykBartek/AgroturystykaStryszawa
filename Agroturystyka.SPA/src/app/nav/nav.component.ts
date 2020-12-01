import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit(): any {
  }

  login(): any{
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('zalogowales sie do aplikacji');
    }, error => {
      this.alertify.error('wystapil blad logowania');
    });
  }

  loggedIn(): any{
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): any{
    localStorage.removeItem('token');
    this.alertify.message('Zostałeś wylogowany');
  }

}
