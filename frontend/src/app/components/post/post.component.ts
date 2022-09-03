import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { HomeService } from 'src/app/home.service';
import { status } from 'src/app/shared/status';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private route: Router, private authService: AuthService, private homeService: HomeService) { }

  postContent: string = "";
  username: string = "";

  ngOnInit(): void {
    this.username = this.authService.fetchCurrentUserName();
  }

  noAuthHeader = {
    headers: new HttpHeaders({
      NoAuth: 'True',
      'Content-Type': 'application/json',
    }),
  };

  newStatus: status = {
    userID: '',
    name: '',
    content: '',
    time: new Date()
  }
  postStatus: any;

  submitPost(){
    console.log(this.postContent);
    this.newStatus.userID = this.authService.fetchCurrentUserId();
    this.newStatus.name = this.authService.fetchCurrentUserName();
    this.newStatus.content = this.postContent;
    this.newStatus.time = new Date();
    console.log(this.newStatus);
    this.homeService.postContent(this.newStatus).subscribe((res)=>{
      if(res){
        console.log('Post Done');

        this.route.navigate(['/home']);
      }
    })
  }

}
