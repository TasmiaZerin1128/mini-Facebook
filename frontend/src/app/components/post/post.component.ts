import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { status } from 'src/app/shared/status';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private route: Router, private authService: AuthService) { }

  postContent: string = "";

  ngOnInit(): void {
  }

  noAuthHeader = {
    headers: new HttpHeaders({
      NoAuth: 'True',
      'Content-Type': 'application/json',
    }),
  };

  postStatus = new status();

  submitPost(){
    console.log(this.postContent);
    console.log(this.authService.getCurrentUsername());
    this.postStatus.name = this.authService.getCurrentUsername();
    this.postStatus.content = this.postContent;
    this.postStatus.time = new Date();
    this.authService.postContent(this.postStatus).subscribe((res)=>{
      if(res){
        console.log('Post Done');
        this.route.navigate(['/home']);
      }
    })
  }

}
