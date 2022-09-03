import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      dob: ['']
    })
  }

  name: string = '';
  email: string = '';
  password: string = '';
  dob: string = '';

  canRegister: boolean = false;
  hasError: boolean = false;
  credError: string = '';

  ngOnInit(): void {
  }

  noAuthHeader = {
    headers: new HttpHeaders({
      NoAuth: 'True',
      'Content-Type': 'application/json',
    }),
  };

  registerUser(){
    if(this.check()){
      console.log(this.registerForm.value);
    this.authService.signUp(this.registerForm.value).subscribe({
      next: data => {
        this.registerForm.reset();
        console.log('Registered');
        this.router.navigate(['']);
      },
      error: error => {
          console.error(error.status);
          this.canRegister = false;
          this.hasError = true;
          this.credError = "Failed to create an account!";
      }
    });
    }
  }

  check():boolean{
    if(this.email!='' && this.password!='' && this.name!='' && this.dob!=''){
      this.canRegister = true;
      return true;
    }
    else{
      this.hasError = true;
      this.credError = "Please enter the credentials correctly";
      if(this.name.length<4)
      {
        this.credError = "Name should be atleast of 4 characters";
      }
      if(this.password.length<6){
        this.credError = "Password must contain atleast 6 characters";
      }
      return false;
    }
  }

}
