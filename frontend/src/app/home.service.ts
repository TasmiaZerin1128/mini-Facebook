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

  endPostpoint: string = 'http://localhost:9001/post';
  endStorypoint: string = 'http://localhost:9001/story';

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
    return this.http.post(`${this.endPostpoint}`, content, {headers : this.headers});
  }

  getContents(){
    return this.http.get<status>(`${this.endPostpoint}`,{headers : this.headers, observe: "response"});
  }

  postStory(story: any): Observable<any>{
    return this.http.post(`${this.endStorypoint}`, story, {headers : this.storyHeader});
  }

  getStories(){
    return this.http.get<story>(`${this.endStorypoint}`,{headers : this.headers, observe: "response"});
  }
  

}
