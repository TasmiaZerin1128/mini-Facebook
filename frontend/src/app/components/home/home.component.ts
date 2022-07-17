import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Event, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { HomeService } from 'src/app/home.service';
import { status } from 'src/app/shared/status';
import { story } from 'src/app/shared/story';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private http: HttpClient, private router: Router, private homeService: HomeService, public datepipe: DatePipe, public domSanitizer: DomSanitizer) { }

  allStatus:any;
  allStory: any;

  fetchedStatuses: status[] = [];
  fetchedStories: story[] = [];

  updatedDate: any;

  username: string = "";

  placeholder = "What's on your mind, ";

  placeholderText: string = "";

  question = "?";

  fileName = '';

  uploadedImage: any;


  file: File | null = null;

  minioHost = "127.0.0.1";
  port = "9000";
  bucket = "minifb";
  
  ngOnInit(): void {
    this.homeService.getContents().subscribe((data) =>{
      this.allStatus = data.body;
      this.fetchedStatuses = this.allStatus;
      for(let i=0;i<this.fetchedStatuses.length;i++){
        this.updatedDate = this.datepipe.transform(this.fetchedStatuses[i].time, 'MMM d, y, h:mm a');
        this.fetchedStatuses[i].time = this.updatedDate;
      }
      this.username = this.authService.fetchCurrentUserName();
      this.placeholderText = this.placeholder.concat(this.username.toString().concat(this.question.toString()));
      console.log(this.username);
    });

    this.homeService.getStories().subscribe((data) =>{
      this.allStory = data.body;
      this.fetchedStories = this.allStory;
      for(let i=0;i<this.fetchedStories.length;i++){
        this.fetchedStories[i].storyUUID = "http://"+this.minioHost+":"+this.port+"/"+this.bucket+"/"+this.fetchedStories[i].storyUUID;
        console.log(this.fetchedStories[i].storyUUID);
      }
    });
  }

  index = 0;

  noAuthHeader = {
    headers: new HttpHeaders({
      NoAuth: 'True',
      'Content-Type': 'application/json',
    }),
  };

  logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }

  goToPost(){
    this.router.navigate(['/post']);
  }

  upload(event:any) {

    this.file = event.target.files[0];
    
    if(this.file){
      const formData = new FormData(); 
      formData.append('files', this.file, this.file.name);
      formData.append('name', this.authService.fetchCurrentUserName());
      formData.append('userID', this.authService.fetchCurrentUserId());

      this.homeService.postStory(formData).subscribe((res)=>{
      if(res){
        console.log('Story Done');
      }
      })
    }
  }

}
