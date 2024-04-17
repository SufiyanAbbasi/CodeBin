import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router:Router, private authService:AuthService){}
  email = new FormControl("",[
    Validators.email,
    Validators.required
  ])
  password = new FormControl("",[
    Validators.required,
    Validators.minLength(8)
  ])

  loginForm = new FormGroup({
    email:this.email,
    password:this.password
  })

  login(){
    console.log(this.loginForm.value)
    this.authService.loginUser(this.loginForm.value.email! ,this.loginForm.value.password!)
  }

  reset(){
    this.loginForm.reset
  }
}
