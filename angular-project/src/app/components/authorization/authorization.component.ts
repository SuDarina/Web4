import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../model/user';
import {AuthorizationService} from '../Services/authorization.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  user: User = new User();
  errormessage: string;

  constructor(public authService: AuthorizationService, public router: Router) {
  }

  ngOnInit(): void {
  }

  // register(): void {
  //   const ans = this.authService.register(this.user);
  //   if (!(ans === '1')) {
  //     this.errormessage = 'user already exist';
  //   } else {
  //     this.router.navigate(['main']);
  //   }
  // }
  register(): void {
    if (this.user.username !== '' || this.user.password !== '') {
      const ans = this.authService.register(this.user);
      if (!(ans === '1')) {
        this.errormessage = 'user already exist';
      } else {
// localStorage.setItem('currentUser', ans);
        this.router.navigate(['main']);
      }
    } else {
      this.errormessage = 'username and password are required';
    }
  }
}
