import {AfterViewInit, Component, ElementRef, Output, ViewChild} from '@angular/core';
@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements AfterViewInit {
  private ctx: any;

  constructor() {
  }

  @ViewChild('canvas')
  canvas: ElementRef;
  widthHeight: string;

  ngAfterViewInit(): void {
    this.drawCanvas(1);
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  resize(): void {
    if (document.body.clientWidth < 700) {
      this.widthHeight = '300';
      document.getElementById('canvas').style.display = 'none';
    } else {
      if (document.body.clientWidth >= 700 && document.body.clientWidth < 1244) {
        this.widthHeight = '400';
      } else {
        this.widthHeight = '450';
      }
    }
    document.getElementById('canvas').setAttribute('width', this.widthHeight);
    document.getElementById('canvas').setAttribute('height', this.widthHeight);
  }

  drawCanvas(r): void {
    this.resize();
    const ctx = this.canvas.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineWidth = 2;

    ctx.beginPath();
//    оси
//    x
    ctx.moveTo(0, ctx.canvas.height / 2);
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);

    // y
    ctx.moveTo(ctx.canvas.width / 2, 0);
    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);

    ctx.stroke();

    // стрелки
    // x
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width - 10, ctx.canvas.height / 2 - 3);
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
    ctx.lineTo(ctx.canvas.width - 10, ctx.canvas.height / 2 + 3);
    ctx.stroke();

    // y
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2 - 3, 10);
    ctx.lineTo(ctx.canvas.width / 2, 0);
    ctx.lineTo(ctx.canvas.width / 2 + 3, 10);
    ctx.stroke();

    //    I
    ctx.beginPath();
    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'lightblue';
    ctx.moveTo(ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.lineTo(7 * ctx.canvas.width / 8, ctx.canvas.height / 2);
    ctx.lineTo(ctx.canvas.width / 2, 7 * ctx.canvas.height / 8);
    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.fill();
    ctx.stroke();


    //      II
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(2.5 * ctx.canvas.width / 8, ctx.canvas.height / 8, 3 * ctx.canvas.width / 16, 3 * ctx.canvas.height / 8);
    ctx.rect(2.5 * ctx.canvas.width / 8, ctx.canvas.height / 8, 3 * ctx.canvas.width / 16, 3 * ctx.canvas.height / 8);
    ctx.stroke();
    ctx.fill();

    //      IV
    ctx.beginPath();
    ctx.fillStyle = '#C07EDF';
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.width / 2, (3 / 8) * ctx.canvas.height, -Math.PI / 2, 0);

    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height / 8);
    ctx.stroke();
    ctx.fill();


    //    разделения
    //    y
    // R
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2.05, ctx.canvas.height / 8);
    ctx.lineTo(ctx.canvas.width / 1.95, ctx.canvas.height / 8);
    ctx.stroke();
    // R/2
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2.05, 2.5 * ctx.canvas.height / 8);
    ctx.lineTo(ctx.canvas.width / 1.95, 2.5 * ctx.canvas.height / 8);
    ctx.stroke();
    // -R
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2.05, 7 * ctx.canvas.height / 8);
    ctx.lineTo(ctx.canvas.width / 1.95, 7 * ctx.canvas.height / 8);
    ctx.stroke();
    // -R/2
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2.05, 5.5 * ctx.canvas.height / 8);
    ctx.lineTo(ctx.canvas.width / 1.95, 5.5 * ctx.canvas.height / 8);
    ctx.stroke();

    //    x
    // -R
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 8, ctx.canvas.height / 2.05);
    ctx.lineTo(ctx.canvas.width / 8, ctx.canvas.height / 1.95);
    ctx.stroke();
    // -R/2
    ctx.beginPath();
    ctx.moveTo(2.5 * ctx.canvas.width / 8, ctx.canvas.height / 2.05);
    ctx.lineTo(2.5 * ctx.canvas.width / 8, ctx.canvas.height / 1.95);
    ctx.stroke();
    // R/2
    ctx.beginPath();
    ctx.moveTo(5.5 * ctx.canvas.width / 8, ctx.canvas.height / 2.05);
    ctx.lineTo(5.5 * ctx.canvas.width / 8, ctx.canvas.height / 1.95);
    ctx.stroke();
    // R
    ctx.beginPath();
    ctx.moveTo(7 * ctx.canvas.width / 8, ctx.canvas.height / 2.05);
    ctx.lineTo(7 * ctx.canvas.width / 8, ctx.canvas.height / 1.95);
    ctx.stroke();

    if (r === '') {
      r = 1;
    }
    if (r.toString().indexOf(',') !== -1) {
      r = r.toString().replace(',', '.');
    }
    console.log(r);
    ctx.fillStyle = 'black';
    const size = ctx.canvas.height / 20;
    ctx.font = size.toString() + 'px Georgia';
    ctx.fillText('-' + r.toString(), ctx.canvas.width / 8, ctx.canvas.height / 2.15);
    ctx.fillText('-' + r.toString(), ctx.canvas.width / 1.85, 7 * ctx.canvas.height / 8);

    ctx.fillText('-' + (r / 2).toString(), 2.5 * ctx.canvas.width / 8, ctx.canvas.height / 2.15);
    ctx.fillText('-' + (r / 2).toString(), ctx.canvas.width / 1.85, 5.5 * ctx.canvas.height / 8);

    ctx.fillText(r.toString(), 7 * ctx.canvas.width / 8, ctx.canvas.height / 2.15);
    ctx.fillText(r.toString(), ctx.canvas.width / 1.85, ctx.canvas.height / 8);

    ctx.fillText((r / 2).toString(), 5.5 * ctx.canvas.width / 8, ctx.canvas.height / 2.15);
    ctx.fillText((r / 2).toString(), ctx.canvas.width / 1.85, 2.5 * ctx.canvas.height / 8);
    ctx.fill();
  }

  drawDot(cx, cy): void {
    // const ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.beginPath();
    this.ctx.fillStyle = '#5611BE';
    this.ctx.arc(cx, cy, this.ctx.canvas.height / 100, 0, Math.PI * 2);
    this.ctx.fill();
  }

  moveDot(x, y, r): void {
    this.drawCanvas(r);
    const cxx = (x / r) * (7 * this.ctx.canvas.width / 8 - this.ctx.canvas.width / 2) + this.ctx.canvas.width / 2;
    const cyy = (this.ctx.canvas.height / 2) - (y / r) * (this.ctx.canvas.width / 2 - this.ctx.canvas.height / 8);
    if (this.validate(x, y, r)) {
      this.drawDot(cxx, cyy);
    }
    console.log(x);
    console.log(y);
  }
  validate(x, y, r): boolean {
    return (((x > -3) && (x < 3)) && (((y > -3) && (y < 3))) && (((r > -3) && (r < 3))));
  }

  canvasClick(r, xin, yin, rin): void {
    if (r === '') {
      r = 1;
    }
    const e: MouseEvent = window.event as MouseEvent;
    const cx = e.offsetX;
    const cy = e.offsetY;
    const x = ((cx - this.ctx.canvas.width / 2) / (7 * this.ctx.canvas.width / 8 - this.ctx.canvas.width / 2)) * r;
    const y = ((this.ctx.canvas.height / 2 - cy) / (this.ctx.canvas.width / 2 - this.ctx.canvas.height / 8)) * r;
    let newx = '';
    let newy = '';
    if (x.toString().length > 5) {
      for (let i = 0; i < 5; i++) {
        newx = newx + x.toString()[i];
      }
      xin.value = newx;
    } else {
      xin.value = x.toString();
    }
    if (y.toString().length > 5) {
      for (let i = 0; i < 5; i++) {
        newy = newy + y.toString()[i];
      }
      yin.value = newy;
    } else {
      yin.value = y.toString();
    }
    rin.value = r.toString();
    if (this.validate(x, y, r)) {
      this.drawDot(cx, cy);
    }
    document.getElementById('send').click();
  }
}
