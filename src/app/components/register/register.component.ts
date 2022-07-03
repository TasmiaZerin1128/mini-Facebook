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

  ngOnInit(): void {
  }

  noAuthHeader = {
    headers: new HttpHeaders({
      NoAuth: 'True',
      'Content-Type': 'application/json',
    }),
  };

  registerUser(){
    console.log(this.registerForm.value);
    // let user = JSON.stringify(this.registerForm.value);
    this.authService.signUp(this.registerForm.value).subscribe((res)=>{
      if(res){
        this.registerForm.reset();
        this.router.navigate([''])
      }
    })
  }

}
