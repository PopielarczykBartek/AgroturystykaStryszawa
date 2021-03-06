import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

jwtHelper = new JwtHelperService();
baseUrl = environment.apiUrl + 'auth/';
decodedToken: any;

constructor(private http: HttpClient) { }


login(model: any): any{
  return this.http.post(this.baseUrl + 'login', model)
  .pipe(map((response: any) => {
    const user = response;
    if (user){
      localStorage.setItem('token', user.token);
      this.decodedToken = this.jwtHelper.decodeToken(user.token);
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

getUserId(): any{
  const token = this.jwtHelper.decodeToken(localStorage.getItem('token'));
  return token.nameid;
}

}
