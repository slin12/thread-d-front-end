import ReactS3 from "react-s3";
import uuid from "uuid";

const config = {
  bucketName: "thread-d",
  region: "us-east-1",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET
};

const dataURItoBlob = dataURI => {
  const binary = atob(dataURI.split(",")[1]);
  let array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
};

let circles = [];
let colors = [
  "rgb(203, 212, 194)",
  "rgb(219, 235, 192)",
  "rgb(195, 178, 153)",
  "rgb(129, 83, 85)",
  "rgb(82, 50, 73)"
];
let loop = true;

export default function sketch(p) {
  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(10);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    colors = props.colors;
    console.log("in the redraw for props!");
    console.log("colors are", colors);
    this.circles();
    //when the save button is clicked
    if (props.saved) {
      p.saveFrames("test", "jpg", 0.25, 25, function(data) {
        let frame = data[0];
        let blob = dataURItoBlob(frame.imageData);
        let file = new File([blob], `${uuid()}.jpg`, { type: "image/jpeg" });
        ReactS3.upload(file, config)
          .then(data => {
            props.createPattern(data.location, props.history);
            console.log(data);
            // props.history.push("/render");
          })
          .catch(err => console.error(err));
        p.remove();
      });
    } else if (props.backClicked) {
      p.remove();
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
