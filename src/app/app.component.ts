import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private _authService : AuthService) { }
  userConnected = this._authService.currentUserValue

  title = 'TFNETSECU_demo_securiter_front_angular';

  logout(){
    this._authService.logout()
  }
}
