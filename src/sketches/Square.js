import uuid from "uuid";
import AWS from "../api/aws.js";

let colors = [
  "rgb(203, 212, 194)",
  "rgb(219, 235, 192)",
  "rgb(195, 178, 153)",
  "rgb(129, 83, 85)",
  "rgb(82, 50, 73)"
];

let distance;
let size;
let loop;

export default function sketch(p) {
  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    distance = 50;
    size = 3;
    p.background(10);
    loop = true;
  };

  p.removeMic = function() {
    return null;
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    colors = props.colors;
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
      });
    } else if (props.backClicked) {
      p.remove();
      props.history.push("/dashboard");
    }
  };

  p.rectangles = function() {
    let x = p.mouseX + (Math.random() - 0.5) * distance;
    let y = p.mouseY + (Math.random() - 0.5) * distance;
    for (let i = 0; i < 10; i++) {
      p.noStroke();
      p.fill(colors[Math.floor(Math.random() * colors.length)]);
      p.rect(x, y, size, size);
    }
  };

  p.keyPressed = function() {
    if (p.keyCode === p.UP_ARROW) {
      size += 1;
    } else if (p.keyCode === p.DOWN_ARROW) {
      size -= 1;
      return false;
    } else {
      if (loop === true) {
        p.noLoop();
        loop = false;
      } else {
        p.loop();
        loop = true;
      }
    }
  };

  p.mouseWheel = function(e) {
    distance += e.delta / 2;
  };

  p.draw = function() {
    p.rectangles();
  };
}
