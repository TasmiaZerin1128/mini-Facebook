import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService, private router: Router, private homeService: HomeService, public datepipe: DatePipe) { }

  allStatus:any;

  fetchedStatuses: status[] = [];

  updatedDate: any;

  username: string = "";

  placeholder = "What's on your mind, ";

  placeholderText: string = "";

  question = "?";

  fileName = '';


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

  logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }

  goToPost(){
    this.router.navigate(['/post']);
  }

  onFileSelected(event:any) {

      console.log("This if the file " + event.target.files[0].name);
  }

}
