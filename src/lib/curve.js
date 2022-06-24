var angleStep = Math.PI/180 * 2.5;

export default function Curve(from, to, func) {
  this.alpha = 0;
  this.from = from;
  this.to = to;

  this.step = function() {
    this.x0 = func.x0(this);
    this.y0 = func.y0(this);

    this.x1 = func.x1(this);
    this.y1 = func.y1(this);
    this.x2 = func.x2(this);
    this.y2 = func.y2(this);

    this.x3 = func.x3(this);
    this.y3 = func.y3(this);

    this.alpha += angleStep;
  }

  this.step();
}

