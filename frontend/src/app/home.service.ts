import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { status } from './shared/status';
import { story } from './shared/story';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  endPostpoint: string = 'http://localhost:100/post';
  endStorypoint: string = 'http://localhost:100/story';

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

  constructor(private http: HttpClient, public router: Router, private authService: AuthService) {
   }

   postContent(content: any): Observable<any>{
    return this.http.post(`${this.endPostpoint}`, content, {headers : this.headers});
  }

  getContents(){
    var _id = this.authService.decodeIdfromToken();
    console.log("ID " + _id);
    return this.http.get<status>(`${this.endPostpoint}/`+ _id,{headers : this.headers, observe: "response"});
  }

  postStory(story: any): Observable<any>{
    return this.http.post(`${this.endStorypoint}`, story, {headers : this.storyHeader});
  }

  getStories(){
    return this.http.get<story>(`${this.endStorypoint}`,{headers : this.headers, observe: "response"});
  }
  

}
