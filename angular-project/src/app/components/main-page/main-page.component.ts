import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PointsHandlerService} from '../Services/points-handler.service';
import {PointEntity} from '../model/point';
import {Router} from '@angular/router';
import {GraphicComponent} from "../graphic/graphic.component";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: []
})

export class MainPageComponent implements OnInit, AfterViewInit {
  canvasName: string;
  formName: string;
  public points: PointEntity[];
  point: PointEntity = new PointEntity();
  p: PointEntity = new PointEntity();
  errorR = '';
  errorX = '';
  errorY = '';

  constructor(public pointsHandlerService: PointsHandlerService, public router: Router) { }

  ngAfterViewInit(): void {
    this.fillCanvas(1);
    }

  ngOnInit(): void {
    this.formName = 'Show';
    this.canvasName = 'Show';
    this.loadPoints();
  }

  clickButton(): void{
    console.log('Send is clicked!');
    this.point.username = localStorage.getItem('currentUser');
    if (this.validate()) {
      this.point.result = this.check();
      this.addPoint();
    }
  }
  check(): boolean{
    const point = this.point;
    if (point.r>0)
      return (point.x >= 0 && point.y <= 0 && point.y >= point.x - point.r)
        || (point.x >= -point.r/2 && point.y <= point.r && point.y >= 0 &&  point.x <= 0)
        || (point.x >= 0 && point.y >= 0 && ((point.x * point.x) + (point.y * point.y)) <= ((point.r * point.r)));
    else {
      const x = -point.x;
      const y = -point.y;
      const r = -point.r;
      return (x >= 0 && y <= 0 && y >= x - r)
        || (x >= -r/2 && y <= r && y >= 0 &&  x <= 0)
        || (x >= 0 && y >= 0 && ((x * x) + (y * y)) <= ((r * r)));
    }
  }
  addPoint(): void{
    const table = document.getElementsByTagName('table').item(0);
    const row = table.insertRow(table.rows.length);
    row.insertCell(0).innerHTML = String(this.point.x);
    row.insertCell(1).innerHTML = String(this.point.y);
    row.insertCell(2).innerHTML = String(this.point.r);
    row.insertCell(3).innerHTML = String(this.point.result);
    this.pointsHandlerService.addPoint(this.point);
  }
  click(id: string): void{
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
  resize(graphic: GraphicComponent, r): void{
    console.log('work');
    this.formName = 'Show';
    this.canvasName = 'Show';
    const but = document.getElementById('hiddenButton');
    const canvasBut = document.getElementById('hiddenCanvas');
    const form = document.getElementById('form');
    const canvas = document.getElementById('canvas');
    if (document.body.clientWidth < 700) {
      form.style.display = 'none';
      canvas.style.display = 'none';
      but.style.display = 'block';
      canvasBut.style.display = 'block';
    } else {
      form.style.display = 'block';
      canvas.style.display = 'block';
      but.style.display = 'none';
      canvasBut.style.display = 'none';
    }
    if (r === '' || isNaN(r/2)){
      r = 1;
    }
    graphic.drawCanvas(r);
    this.fillCanvas(r);
  }

  setResult(): void{
    this.point.result = this.check();
  }
  save(): void {
    this.setResult();
    this.pointsHandlerService.addPoint(this.point);
  }

  clear(canvas: GraphicComponent, r): void {
    this.pointsHandlerService.clear();
    this.loadPoints();
    if (r === ''){
      r = 1;
    }
    canvas.drawCanvas(r);
    canvas.moveDot(this.point.x, this.point.y, r);
  }
  logout(): void {
    this.pointsHandlerService.logOut();
  }

  validateR(r): void {

      r = this.replaceComa(r);
    this.point.r = r;
    console.log(r);
    if (r !== '0')
      this.errorR = this.validateForm(r);
   else
      this.errorR = 'Невозможное значение для радиуса'
  }
  validateX(x): void {
    x = this.replaceComa(x);
    this.point.x = x;
    this.replaceComa(x);
    this.errorX = this.validateForm(x);
  }
  validateY(y): void {
      y = this.replaceComa(y);
    this.point.y = y;
    this.replaceComa(y);
    this.errorY = this.validateForm(y);
  }
  validateForm(val): string{
    if (val <= -3 || val >= 3){
      console.log(val)
      return 'Значение должно быть (-3..3)';
    }
    else{
      if (!Number(val) && val != 0)
        return 'не может быть текстом';
      else
        return '';
    }
  }

  replaceComa(val: any): string{
    console.log(val);
    if (val !== '') {
      val = val.toString();
      let newval = '';
      for (let word of val) {
        if (word === ',') {
          word = '.';
        }
        newval = newval + word;
      }
      console.log(newval);
      return newval;
    } else
      return val;
  }

  validate(): boolean {

    this.validateX(this.point.x);
    this.validateY(this.point.y);
    this.validateR(this.point.r);
    return (this.point.x < 3 && this.point.x > -3)
      && (this.point.y < 3 && this.point.y > -3)
      && (this.point.r < 3 && this.point.r > -3) && (this.point.x !== '' && this.point.y !== '' && this.point.r !== '')
      && (this.point.r !== '0');
  }

  loadPoints(): void{
    const username = localStorage.getItem('currentUser');
    this.pointsHandlerService.loadPoints(username);
  }

  fillCanvas(r): void{
    if (r === '' || isNaN(r/2)){
      r = 1;
    }
    const ctx = document.getElementsByTagName('canvas').item(0).getContext('2d');
    let cells = document.querySelectorAll("#main-table td");
    let arr_x = []
    let arr_y = []
    let arr_r= []
    let arr_res= []
    let arr_cx = []
    let arr_cy = []

    if(cells[0].innerHTML !== "") {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < cells.length; j = j + 4) {
          if (i === 0) arr_x.push(cells[i + j].innerHTML)
          if (i === 1) arr_y.push(cells[i + j].innerHTML)
          if (i === 2) arr_r.push(cells[i + j].innerHTML)
          if (i === 3) arr_res.push(cells[i + j].innerHTML)
        }
      }
    }
    for (let i = 0; i < arr_x.length; i++){
      let cx = (arr_x[i] / r) * (7 * ctx.canvas.width / 8 - ctx.canvas.width / 2) + ctx.canvas.width / 2;
      arr_cx.push(cx);

    }
    for (let i = 0; i < arr_y.length; i++) {
      let cy = (ctx.canvas.height / 2) - (arr_y[i] / r) * (ctx.canvas.width / 2 - ctx.canvas.height / 8);
      arr_cy.push(cy);
    }
    for (let i = 0; i < arr_res.length; i++){
      ctx.beginPath();
      if (arr_res[i] === "true")
        ctx.fillStyle = "green"
      else
        ctx.fillStyle = "darkred"
      ctx.arc(arr_cx[i], arr_cy[i], ctx.canvas.height/100, 0, Math.PI * 2);
      ctx.fill();
    }

  }
}
