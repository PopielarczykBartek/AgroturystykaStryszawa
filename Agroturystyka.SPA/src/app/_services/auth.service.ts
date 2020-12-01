import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

jwtHelper = new JwtHelperService();
baseUrl = 'http://localhost:5000/api/auth/';

constructor(private http: HttpClient) { }


login(model: any): any{
  return this.http.post(this.baseUrl + 'login', model)
  .pipe(map((response: any) => {
    const user = response;
    if (user){
      localStorage.setItem('token', user.token);
    }
  }));
}

register(model: any): any{
return this.http.post(this.baseUrl + 'register', model);
}

loggedIn(): any{
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token); // jesli token nie wygasl
}

}
