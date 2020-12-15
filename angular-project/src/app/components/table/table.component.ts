import { Component, OnInit } from '@angular/core';
import {PointEntity} from '../model/point';
import {PointsHandlerService} from '../Services/points-handler.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public points: PointEntity[];

  constructor(private service: PointsHandlerService) { }

  ngOnInit(): void {
    // this.service.getPoints();
  }

}
