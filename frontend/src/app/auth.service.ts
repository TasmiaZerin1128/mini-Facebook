import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from './shared/user';
import { token_id } from './shared/itoken_info';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { RegisterComponent } from './components/register/register.component';

const jwt = new JwtHelperService();

class DecodedToken {
  _id: number = 0;
  username: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = 'http://localhost:3000/api';
  decodedToken= new DecodedToken();
  
  currentUser:any = [];

  userid: string = '';
  username: string = '';
  authToken: any;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  }); 

  constructor(private http: HttpClient, public router: Router) {
   }

  signUp(user: any): Observable<any>{
    return this.http.post(`${this.endpoint}/register`, user, {headers : this.headers});
  }

  // login(user: any){
  //   return this.http.post<any>(`${this.endpoint}/login`, user, {headers : this.headers});
  // }

  login(user: any): Observable<token_id>{
    return this.http.post<token_id>(`${this.endpoint}/login`, user, {headers : this.headers}).pipe(map((res) => {
      return this.saveToken(res);
    }));
  }

  saveToken(response: any): any {
    const token = response.token;
    this.decodedToken = jwt.decodeToken(token);
    console.log(this.decodedToken._id);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
    this.saveUser();

    return token;
  }

  saveUser(){
    if(this.isAuthenticated){
      this.getCurrentUser(this.decodeIdfromToken()).subscribe((res)=>{
        this.currentUser = res.body;
        this.userid = this.currentUser._id;
        this.username = this.currentUser.name;
        console.log("Hello from " + this.username);
      });
    }
  }

  decodeIdfromToken(){
    this.decodedToken = jwt.decodeToken(this.authToken);
    return this.decodedToken._id;
  }

  logout(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');
    this.decodedToken = new DecodedToken();
  }

  get isAuthenticated(): boolean {
    this.authToken = localStorage.getItem('auth_tkn');
    console.log("AuthToken" + this.authToken);
    return this.authToken != null ? true : false;
  }


  getCurrentUser(_id: any){
    return this.http.get(`${this.endpoint}/user-profile/`+ _id, {headers : this.headers, observe: "response"});
  }

  getAllUsers(){
    return this.http.get(`${this.endpoint}/users`, {headers : this.headers, observe: "response"});
  }

  fetchCurrentUserId(){
    console.log("User id "+ this.userid);
    return this.userid;
  }

  fetchCurrentUserName(){
    console.log("User name "+ this.username);
    return this.username;
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
