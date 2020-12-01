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

  constructor(public authService: AuthService, private alertify: AlertifyService) { }

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
    return this.authService.loggedIn();
  }

  logout(): any{
    localStorage.removeItem('token');
    this.alertify.message('Zostałeś wylogowany');
  }

}
