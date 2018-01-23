import uuid from "uuid";
import AWS from "../api/aws.js";

let circles = [];
let colors = [];
let loop;

export default function sketch(p) {
  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(10);
    loop = true;
    circles = [];
  };

  p.removeMic = function() {
    return null;
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    colors = props.colors;
    this.circles();
    //when the save button is clicked
    if (props.saved) {
      p.saveFrames("test", "jpg", 0.25, 25, function(data) {
        let frame = data[0];
        let blob = AWS.dataURItoBlob(frame.imageData);
        let file = new File([blob], `${uuid()}.jpg`, { type: "image/jpeg" });
        AWS.sendFile(file)
          .then(data => {
            props.createPattern(data.location, props.history);
          })
          .catch(err => console.error(err));
        p.remove();
        circles = [];
      });
    } else if (props.backClicked) {
      p.remove();
      circles = [];
      props.history.push("/dashboard");
    }
  };

  p.mouseWheel = function(e) {
    circles = circles.map(c => {
      return { ...c, diameter: (c.diameter += e.delta / 2) };
    });
  };

  p.keyPressed = function() {
    if (loop === true) {
      p.noLoop();
      loop = false;
    } else {
      p.loop();
      loop = true;
    }
  };

  p.circles = function() {
    for (let i = 0; i < 20; i++) {
      let circle = {
        x: Math.floor(Math.random() * (window.innerWidth - 50) + 50),
        y: Math.floor(Math.random() * (window.innerHeight - 50) + 50),
        diameter: Math.floor(Math.random() * 10 + 2),
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      circles.push(circle);
    }
  };

  p.draw = function() {
    p.stroke(255);
    circles.forEach(c => {
      p.fill(c.color);
      p.ellipse(c.x, c.y, c.diameter, c.diameter);
      if (c.x > window.innerWidth || c.x < 0) {
        c.dx = -c.dx;
      }
      if (c.y > window.innerHeight || c.y < 0) {
        c.dy = -c.dy;
      }
      c.x += c.dx;
      c.y += c.dy;
    });
  };
}
