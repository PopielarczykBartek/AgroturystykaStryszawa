import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit(): any {
  }

  login(): any{
    this.authService.login(this.model).subscribe(next => {
      console.log('zalogowales sie do aplikacji');
    }, error => {
      console.log('wystapil blad logowania');
    });
  }

  loggedIn(): any{
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): any{
    localStorage.removeItem('token');
    console.log('Zostałeś wylogowany');
  }

}
