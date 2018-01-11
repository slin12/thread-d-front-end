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

export default function sketch(p) {
  let circles = [];
  let colors = [
    { r: 203, g: 212, b: 194 },
    { r: 219, g: 235, b: 192 },
    { r: 195, g: 178, b: 153 },
    { r: 129, g: 83, b: 85 },
    { r: 82, g: 50, b: 73 }
  ];
  let loop = true;

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    this.circles();
    p.background(100);
  };

  //after button is clicked, do all the heavy lifting
  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.saved) {
      p.saveFrames("test", "jpg", 0.25, 25, function(data) {
        let frame = data[0];
        let blob = dataURItoBlob(frame.imageData);
        let file = new File([blob], `${uuid()}.jpg`, { type: "image/jpeg" });
        ReactS3.upload(file, config)
          .then(data => {
            props.createPattern(data.location);
            console.log(data);
          })
          .catch(err => console.error(err));
        p.remove();
        // props.history.push("/dashboard");
      });
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
      p.fill(c.color.r, c.color.g, c.color.b);
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
