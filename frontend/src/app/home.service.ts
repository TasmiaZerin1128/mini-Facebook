import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { status } from './shared/status';
import { story } from './shared/story';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  endpoint: string = 'http://localhost:3000/api';

  allStatus: any;

  headers = new HttpHeaders({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  }); 

  storyHeader = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  });

  constructor(private http: HttpClient, public router: Router) {
   }

   postContent(content: any): Observable<any>{
    return this.http.post(`${this.endpoint}/home/status`, content, {headers : this.headers});
  }

  getContents(){
    return this.http.get<status>(`${this.endpoint}/home/status`,{headers : this.headers, observe: "response"});
  }

  postStory(story: any): Observable<any>{
    return this.http.post(`${this.endpoint}/home/story`, story, {headers : this.storyHeader});
  }

  getStories(){
    return this.http.get<story>(`${this.endpoint}/home/story`,{headers : this.headers, observe: "response"});
  }
  

}
