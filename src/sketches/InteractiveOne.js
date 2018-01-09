export default function sketch(p) {
  let circles = [];

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    this.circles();
    p.background(100);
  };

  p.circles = function() {
    for (let i = 0; i < 30; i++) {
      let circle = {
        width: Math.floor(Math.random() * window.innerWidth),
        height: Math.floor(Math.random() * window.innerHeight),
        radius: Math.floor(Math.random() * 30 + 1),
        dx: Math.random() + 0.1,
        dy: Math.random() + 0.1
      };
      circles.push(circle);
    }
  };

  p.draw = function() {
    p.noStroke();
    circles.forEach(c => {
      p.ellipse(c.width, c.height, c.radius, c.radius);
      if (c.width > window.innerWidth || c.width < 0) {
        c.dx = -c.dx;
      }
      if (c.height > window.innerHeight || c.height < 0) {
        c.dy = -c.dy;
      }
      c.width += c.dx;
      c.height += c.dy;
    });
  };
}
