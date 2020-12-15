import {Component, Input, OnInit} from '@angular/core';
import {User} from '../model/user';
import {UsersHandlerService} from '../Services/users-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errormessage: string;

  constructor(public usersHandlerService: UsersHandlerService) { }

  ngOnInit(): void {
  }

  login(): void{
    const ans = this.usersHandlerService.login(this.user);
    if (!(ans === '1')){
      this.errormessage = ans;
    }
  }
}
