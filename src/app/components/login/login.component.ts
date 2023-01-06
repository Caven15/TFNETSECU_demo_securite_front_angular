import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/models/loginForm.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public LoginForm : FormGroup;
  public user : LoginForm;

  constructor(private _route : Router, private _authService : AuthService, private _formBuilder : FormBuilder) { }

  ngOnInit(): void {

    this.LoginForm = this._formBuilder.group({
      email : [null, [Validators.email,Validators.required]],
      password : [null, [Validators.required]]
    })
  }

  login(): void{
    this.user = new LoginForm;
    this.user.email = this.LoginForm.value["email"];
    this.user.password = this.LoginForm.value["password"];
    let currentUser : User;
    this._authService.Login(this.LoginForm.value).subscribe({
        next: (user) => {
          currentUser = user;
          if (currentUser != null){
            this._route.navigate(["home"]);
          }
        }
      }
    );
  }
}
