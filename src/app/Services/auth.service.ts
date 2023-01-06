import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../models/loginForm.model';
import { RegisterForm } from '../models/registerForm.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUserSubject : BehaviorSubject<User>

  public get currentUserValue(): User {
    return this._currentUserSubject.value;
  }

  constructor(private _client: HttpClient, private _route: Router) {
    this._currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
  }

  Register(user:RegisterForm) : Observable<any>{
    return this._client.post(`${environment.apiUrl}/Auth/Register`, user);
  }

  Login(userLogin:LoginForm) : Observable<User>{//
    console.log(userLogin);
    return this._client.post<any>(`${environment.apiUrl}/Auth/Login`, userLogin)
    .pipe(map(user => {
      // Inserer l'utilisateur dans le sessionStorage
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      this._currentUserSubject.next(user);
      console.log(user);
      return user;
    }));
  }

  logout(){
    sessionStorage.removeItem('currentUser');
    this._currentUserSubject.next(null);
  }

  isConnected() : boolean {
    return (this.currentUserValue != null);
  }
}
