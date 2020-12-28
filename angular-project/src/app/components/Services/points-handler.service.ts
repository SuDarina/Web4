import {Injectable} from '@angular/core';
import {PointEntity} from '../model/point';
import {HttpHeaders} from '@angular/common/http';
import {AppComponent} from '../../app.component';

@Injectable()
export class PointsHandlerService {
  private thead = '<tr>\n' +
    '        <th>X</th>\n' +
    '        <th>Y</th>\n' +
    '        <th>R</th>\n' +
    '        <th>Result</th>\n' +
    '      </tr>';
  constructor() {
  }

  addPoint(point: PointEntity): void {
    let ans: string;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    const data = {
      x: point.x,
      y: point.y,
      r: point.r,
      result: point.result,
      username: point.username
    };
    console.log(data);
    const request = new XMLHttpRequest();
    const arr = 'x=' + encodeURIComponent(data.x) + '&y=' + encodeURIComponent(data.y) + '&r=' + encodeURIComponent(data.r) + '&result=' + encodeURIComponent(data.result) + '&username=' + encodeURIComponent(point.username);
    request.open('POST', AppComponent.API_URL + '/main', false);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(arr);
    if ((request.status !== 200) && (request.status !== 403)) {
      console.log(request.status + ': ' + request.statusText);
      console.log(request.response);
      console.log(request.responseText);
    } else {
      console.log(request.response);
      ans = request.response;
      console.log('AAAAAAAAAAA ' + ans);
    }
  }

  loadPoints(username: string): void {
    console.log('here');
    let ans: string;
    const headers = new HttpHeaders();
    const request = new XMLHttpRequest();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    const arr = 'username=' + encodeURIComponent(username);
    request.open('POST', AppComponent.API_URL + '/load', false);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(arr);
    if ((request.status !== 200) && (request.status !== 403)) {
      console.log(request.status + ': ' + request.statusText);
      console.log(request.response);
      console.log(request.responseText);
    } else {
      ans = request.response;
      document.getElementById('main-table').innerHTML = this.thead + ans;
    }
  }
  clear(): void {
    console.log('points-handler clear');
    const request = new XMLHttpRequest();
    const username = localStorage.getItem('currentUser');
    const arr = 'username=' + encodeURIComponent(username);
    request.open('POST', AppComponent.API_URL + '/clear', false);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(arr);
    console.log(request.response);
    console.log(request.responseText);
    if (request.response === '1'){
      console.log('here')
      document.getElementById('main-table').innerHTML = this.thead;
    }
  }

  logOut(): void {
    localStorage.removeItem('currentUser');
  }
}
