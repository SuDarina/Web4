import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {UsersHandlerService} from '../Services/users-handler.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errormessage: string;

  constructor(public usersHandlerService: UsersHandlerService, public router: Router) { }

  ngOnInit(): void {
  }

  // login(): void {
  //   const ans = this.usersHandlerService.login(this.user);
  //   if (!(ans === '1')) {
  //     this.errormessage = ans;
  //   } else {
  //    // localStorage.setItem('currentUser', ans);
  //     this.router.navigate(['main']);
  //   }
  // }
  login(): void {
    if (this.user.username !== '' || this.user.password !== '') {
      const ans = this.usersHandlerService.login(this.user);
      if (!(ans === '1')) {
        this.errormessage = ans;
      } else {
// localStorage.setItem('currentUser', ans);
        this.router.navigate(['main']);
      }
    } else {
      this.errormessage = 'username and password are required';
    }
  }
}
