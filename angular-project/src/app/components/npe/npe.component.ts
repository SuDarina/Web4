import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-npe',
  templateUrl: './npe.component.html',
  styleUrls: ['./npe.component.css'],
  animations: [
    // animation triggers go here
  ]
})
export class NpeComponent implements OnInit {

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }
  move(): void{
   /* document.getElementById('npe').animate({
        down: Math.random() * 300
      }, 100);
    document.getElementById('npe').animate({
        right: Math.random() * 300
      }, 100);
*/
    }
    win(): void{
     // this.router.navigate(['win']);
    }
}
