import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterForm } from 'src/app/models/registerForm.model';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm : FormGroup;
  public user : RegisterForm;
  public errorMessage : string = "";

  constructor(private _route : Router, private _authService : AuthService, private _formBuilder : FormBuilder) { }

  ngOnInit(): void {

    this.registerForm = this._formBuilder.group({
      nom : [null, [Validators.required]],
      prenom : [null, [Validators.required]],
      dateNaissance : [null,[Validators.required]],
      email : [null, [Validators.email,Validators.required]],
      password : [null, [Validators.required]],
      confirmPassword : [null, [Validators.required]]
    })
  }

  register(): void{

    this.user = new RegisterForm;
    this.user.nom = this.registerForm.value["nom"];
    this.user.prenom = this.registerForm.value["prenom"];
    this.user.dateNaissance = new Date(this.registerForm.value["dateNaissance"]);
    this.user.email = this.registerForm.value["email"];
    this.user.password = this.registerForm.value["password"];

    this._authService.Register(this.user).subscribe(
      {
        next : () => {
          this._route.navigate(["home"]);
        },
        error : (error) =>{
          this.errorMessage = "l'enregistrement a échoué veuillez ressayer...";
          console.log(error);
        },
      }
    );
  }


}
