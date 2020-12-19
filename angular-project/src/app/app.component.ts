import { Component } from '@angular/core';
import { share } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
  }
  static API_URL = 'http://localhost:3350/Web4-0.1';
  title = 'Web_4';
  public isDark = false;
  changeTheme(): void{
    if (this.isDark){
      document.documentElement.setAttribute('data-theme', '');
    }else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    this.isDark = !this.isDark;
    console.log(this.isDark);
    console.log(document.documentElement.getAttribute('data-theme'));
  }
}

