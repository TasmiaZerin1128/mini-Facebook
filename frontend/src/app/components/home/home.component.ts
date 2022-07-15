import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService, private router: Router, private homeService: HomeService, public datepipe: DatePipe, public domSanitizer: DomSanitizer) { }

  allStatus:any;

  fetchedStatuses: status[] = [];

  updatedDate: any;

  username: string = "";

  placeholder = "What's on your mind, ";

  placeholderText: string = "";

  question = "?";

  fileName = '';

  uploadedImage: any;


  file: File | null = null;

  
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
  }

  index = 0;

  noAuthHeader = {
    headers: new HttpHeaders({
      NoAuth: 'True',
      'Content-Type': 'application/json',
    }),
  };

  newStory: story = {
    userID: '',
    name: '',
    story: '',
    time: new Date()
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }

  goToPost(){
    this.router.navigate(['/post']);
  }

  onFileSelected(event:any) {

    this.file = event.target.files[0];
    
    let reader = new FileReader();

    if(this.file){
      reader.readAsDataURL(this.file);
      reader.onload = (_event) => {
			let storyData = reader.result;
      if(storyData){
        this.newStory.story = storyData;
        this.uploadedImage = storyData;
        
        //this.toBase64(storyData);
      }
      
		}
    }
    this.newStory.userID = this.authService.fetchCurrentUserId();
    this.newStory.name = this.authService.fetchCurrentUserName();
    this.newStory.time = new Date();
    this.homeService.postStory(this.newStory).subscribe((res)=>{
      if(res){
        console.log('Story Done');
      }
    })
  }

  toBase64(storydata: any){
    storydata = new Uint8Array(storydata);

    const STRING_CHAR = storydata.reduce((data:any, byte:any)=> {
      return data + String.fromCharCode(byte);}, '');

    let base64String = btoa(STRING_CHAR);

    this.uploadedImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + base64String);
    console.log(this.uploadedImage);
  }

}
