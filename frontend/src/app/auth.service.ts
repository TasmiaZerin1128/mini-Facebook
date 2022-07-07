import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from './shared/user';
import { token_id } from './shared/itoken_info';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

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

  userid: any;
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
    return token;
  }

  saveUser(){
    if(this.isAuthenticated){
      this.getCurrentUser(this.decodeIdfromToken()).subscribe((res)=>{
        this.currentUser = res.body;
        console.log("DATA " + res.body);
        console.log("Hello from " + this.currentUser);
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
    console.log(this.authToken);
    return this.authToken !== null ? true : false;
  }

  postContent(content: any): Observable<any>{
    return this.http.post(`${this.endpoint}/home/status`, content, {headers : this.headers});
  }

  getCurrentUser(_id: any){
    return this.http.get(`${this.endpoint}/user-profile/`+ _id, {headers : this.headers, observe: "response"});
  }

  getCurrentUsername(){
    console.log("User id "+ this.userid);
    console.log("Current "+ this.currentUser);
    return this.currentUser;
  }

  getContents(){
    return this.http.get(`${this.endpoint}/home`,{headers : this.headers, observe: "response"});
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
