import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private homeService: HomeService){

  }

  ngOnInit(): void {
    console.log('Hello');
    this.authService.saveUser();
  }

  title = 'frontend';

}
