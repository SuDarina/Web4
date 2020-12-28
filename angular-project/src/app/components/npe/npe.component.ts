import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-npe',
  templateUrl: './npe.component.html',
  styleUrls: ['./npe.component.css'],
  animations: []
})
export class NpeComponent implements OnInit {

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }
}
