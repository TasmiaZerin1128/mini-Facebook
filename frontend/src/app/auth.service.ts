import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from './shared/user';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number = 0;
  username: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = 'http://localhost:3000/api';
  decodedToken= new DecodedToken();

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  }); 

  constructor(private http: HttpClient, public router: Router) {
   }

  // showSuccess(message:any, title:any){
  //   this.toastr.success(message, title);
  // }

  signUp(user: any): Observable<any>{
    return this.http.post(`${this.endpoint}/register`, user, {headers : this.headers});
  }

  login(user: any): Observable<any>{
    return this.http.post(`${this.endpoint}/login`, user, {headers : this.headers}).pipe(map(token => {
      return this.saveToken(token);
    }));
  }

  saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  logout(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');
    this.decodedToken = new DecodedToken();
  }

  get isAuthenticated(): boolean {
    let authToken = localStorage.getItem('auth_tkn');
    console.log(authToken);
    return authToken !== null ? true : false;
  }


  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
