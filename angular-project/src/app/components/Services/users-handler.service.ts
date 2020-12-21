import {Injectable} from '@angular/core';
import {User} from '../model/user';
// import {Http, RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AppComponent} from '../../app.component';
import {Router} from '@angular/router';

@Injectable()
export class UsersHandlerService {
  constructor(public httpClient: HttpClient,  public router: Router) {
  }

  public login(user: User): string {
    let ans: string;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const details = {
      username: user.username,
      password: user.password,
    };

    console.log(details);
    console.log(details.password);
    const request = new XMLHttpRequest();
    const arr = 'username=' + encodeURIComponent(details.username) + '&password=' + encodeURIComponent(details.password);
    request.open('POST', 'http://localhost:3350/Web4-0.1/login', false);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(arr);

    if ((request.status !== 200) && (request.status !== 403)) {
      console.log( request.status + ': ' + request.statusText );
      console.log(request.response);
      console.log(request.responseText);
    } else {
      console.log(request.response);
      ans = request.response;
      console.log('AAAAAAAAAAA ' + ans);
      if (ans === 'wrong password' || ans === 'not registered' || ans === 'error'){
        return(ans);
      }else {
        localStorage.setItem('currentUser', ans);
       // this.router.navigate(['http://localhost:3355/#/main']);
        return ('1');
      }
    }
  }
}
