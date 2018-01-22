import "p5/lib/addons/p5.dom";

export default function sketch(p) {
  let circles = [];

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    this.circles();
  };

  //clean up after redirect
  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.clicked) {
      p.remove();
      props.history.push("/signup");
    }
  };

  p.circles = function() {
    for (let i = 0; i < 25; i++) {
      let circle = {
        x: Math.floor(Math.random() * (window.innerWidth - 80) + 60),
        y: Math.floor(Math.random() * (window.innerHeight - 80) + 60),
        diameter: Math.floor(Math.random() * 30 + 20),
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4
      };
      circles.push(circle);
    }
  };

  const changeVelocity = c => {
    if (c.x + c.diameter / 2 > window.innerWidth || c.x - c.diameter / 2 < 0) {
      c.dx = -c.dx;
    }
    if (c.y + c.diameter / 2 > window.innerHeight || c.y - c.diameter / 2 < 0) {
      c.dy = -c.dy;
    }
    c.x += c.dx;
    c.y += c.dy;
  };

  const text = () => {
    //title
    p.noStroke();
    p.fill(235, 81, 96);
    p.textFont("Libre Franklin");
    p.textSize(75);
    p.textStyle(p.ITALIC);
    p.textAlign(p.CENTER);
    p.text("thread'd", window.innerWidth / 2, window.innerHeight / 2 - 70);
    //subheading
    p.fill(179, 172, 167)
    p.textSize(24);
    p.textStyle(p.NORMAL);
    p.textFont("Muli");
    p.text(
      "an interactive experience to create custom clothing",
      window.innerWidth / 2,
      window.innerHeight / 2
    );
  };

  p.draw = () => {
    p.background(50);
    //loop through circles to draw them and draw lines between
    circles.forEach(c => {
      p.noStroke();
      p.fill(255, 255, 255, 50);
      p.ellipse(c.x, c.y, c.diameter, c.diameter);
      changeVelocity(c);
      circles.forEach(circleTwo => {
        let a = Math.abs(c.x - circleTwo.x);
        let b = Math.abs(c.y - circleTwo.y);
        let distance = Math.sqrt(a * a + b * b);
        if (distance < 200) {
          p.stroke(255, 255, 255, 70);
          p.line(c.x, c.y, circleTwo.x, circleTwo.y);
        }
      });
    });
    text();
  };
}
