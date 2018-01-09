export default function sketch(p) {
  let circles = [];

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    this.circles();
    console.log(circles);
  };

  p.circles = function() {
    for (let i = 0; i < 30; i++) {
      let circle = {
        x: Math.floor(Math.random() * (window.innerWidth - 30)),
        y: Math.floor(Math.random() * (window.innerHeight - 30)),
        radius: Math.floor(Math.random() * 30 + 5),
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4
      };
      circles.push(circle);
    }
  };

  const changeVelocity = c => {
    if (c.x + c.radius / 2 > window.innerWidth || c.x - c.radius / 2 < 0) {
      c.dx = -c.dx;
    }
    if (c.y + c.radius / 2 > window.innerHeight || c.y - c.radius / 2 < 0) {
      c.dy = -c.dy;
    }
    c.x += c.dx;
    c.y += c.dy;
  };

  p.draw = () => {
    p.background(100);
    p.noStroke();
    circles.forEach(c => {
      p.ellipse(c.x, c.y, c.radius, c.radius);
      changeVelocity(c);
      circles.forEach(circleTwo => {
        if (
          Math.abs(c.y - circleTwo.y) < 5 ||
          Math.abs(c.x - circleTwo.x) < 5
        ) {
          p.stroke(255);
          p.line(c.x, c.y, circleTwo.x, circleTwo.y);
        }
      });
    });
  };
}
