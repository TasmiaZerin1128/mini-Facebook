import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }
  
  email: string = '';
  password: string = '';
  show: boolean = false;
  
  canLogin: boolean = false;
  hasError: boolean = false;
  emailpassError: string = '';
  
  
  ngOnInit(): void {
  }
  
  noAuthHeader = {
    headers: new HttpHeaders({
      NoAuth: 'True',
      'Content-Type': 'application/json',
    }),
  };
  
  loginUser(){
    console.log(this.loginForm.value);
    if(this.check()){
      this.authService.login(this.loginForm.value).subscribe({
        next: data => {
          this.loginForm.reset();
          console.log('Logged In ');
          this.router.navigate(['home']);
        },
        error: error => {
          console.error(error.status);
          this.canLogin = false;
          this.hasError = true;
          this.emailpassError = "Incorrect email or password!";
        }
      });
    }
    
  }
  
  check():boolean{
    if(this.email!='' && this.password!=''){
      this.canLogin = true;
      return true;
    }
    else{
      this.hasError = true;
      this.emailpassError = "Please enter email & password correctly";
      return false
    }
  }
  
  showPassword() {
    this.show = !this.show;
  }
  
}
