import { AuthService } from 'shared/services/auth.service';
import { Injectable } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class LoginComponent {

  constructor(private auth: AuthService) { 

  }

  login(){
    this.auth.login();
  }

}
