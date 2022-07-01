import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
  }

}
