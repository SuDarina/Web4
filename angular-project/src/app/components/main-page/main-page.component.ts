import {Component, OnInit} from '@angular/core';
import {PointsHandlerService} from '../Services/points-handler.service';
import {PointEntity} from '../model/point';
import {Router} from '@angular/router';
import validate = WebAssembly.validate;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  canvasName: string;
  formName: string;
  public points: PointEntity[];
  point: PointEntity = new PointEntity();
  p: PointEntity = new PointEntity();

  constructor(public pointsHandlerService: PointsHandlerService, public router: Router) { }

  ngOnInit(): void {
    this.formName = 'Show';
    this.canvasName = 'Show';
    // this.pointsHandlerService.getPoints();

  }
/*  fill(): void{
    this.pointsHandlerService.getPoints();
    const table = document.getElementsByTagName('table').item(0);
    table.insertRow()
  }*/

  clickButton(): void{
    console.log('Send is clicked!');
    if (this.validate()) {
      this.point.result = this.check();
      this.addPoint();
    }
  }
  check(): boolean{
    return (this.point.x < 0 && this.point.x > -(this.point.r / 2) && (this.point.y > 0 && this.point.y < this.point.r))
      || ((((this.point.x * this.point.x) + (this.point.y * this.point.y)) <= ((this.point.r * this.point.r)))
        && (this.point.x) > 0 && this.point.x < this.point.r)
      || ((this.point.x > 0 && this.point.x < this.point.r && this.point.y < (this.point.x - this.point.r)));
  }
  addPoint(): void{
    const table = document.getElementsByTagName('table').item(0);
    const row = table.insertRow(table.rows.length);
    row.insertCell(0).innerHTML = String(this.point.x);
    row.insertCell(1).innerHTML = String(this.point.y);
    row.insertCell(2).innerHTML = String(this.p.r);
    row.insertCell(3).innerHTML = String(this.point.result);
    this.pointsHandlerService.addPoint(this.point);
  }
  click(id: string): void{
    // document.getElementById('form').setAttribute('style', 'display: block');
    this.p = this.point;
    const form = document.getElementById(id);
    if (form.style.display === 'none' || form.style.display === '') {
      console.log(form.style.display);
      form.style.display = 'block';
      if (id === 'canvas') {
        this.canvasName = 'Hide';
      } else {
        this.formName = 'Hide';
      }
    } else{
      form.style.display = 'none';
      if (id === 'canvas') {
        this.canvasName = 'Show';
      } else {
        this.formName = 'Show';
      }
    }
    console.log('clicked');
  }
  validate(): boolean {
    return (this.point.x < 3 && this.point.x > -3)
      && (this.point.y < 3 && this.point.y > -3)
      && (this.point.r < 3 && this.point.r > -3);
  }
  setResult(): void{
    this.point.result = this.check();
  }
  save(): void {
    this.setResult();
    this.pointsHandlerService.addPoint(this.point);
  }
  clear(): void {
    this.pointsHandlerService.clear();
    this.router.navigate(['/clear']);
  }
  logout(): void {
    this.pointsHandlerService.logOut();
  }

}
