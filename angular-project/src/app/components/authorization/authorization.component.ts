import { Component, OnInit } from '@angular/core';
import {Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import { UsersHandlerService} from '../Services/users-handler.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../model/user';
import {AuthorizationService} from '../Services/authorization.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  user: User = new User();

  constructor(public authService: AuthorizationService) { }

  ngOnInit(): void {
  }

  register(): void{
   this.authService.register(this.user);
  }
}
