import ReactS3 from "react-s3";

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
  let colors = [{ r: 255, g: 255, b: 255 }, { r: 21, g: 116, b: 133 }];
  let loop = true;

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    this.circles();
    p.background(100);
  };

  p.mouseWheel = function(e) {
    circles = circles.map(c => {
      return { ...c, diameter: (c.diameter += e.delta / 2) };
    });
  };

  p.keyPressed = function() {
    if (p.keyCode === p.ENTER) {
      p.saveFrames("test", "jpg", 0.25, 25, function(data) {
        let frame = data[0];
        let blob = dataURItoBlob(frame.imageData);
        let file = new File([blob], "test.jpg", { type: "image/jpeg" });
        console.log(blob);
        console.log("file is", file);
        // frame.imageData = frame.imageData.replace(
        //   /^data:image\/[\w-]+;base64,/,
        //   ""
        // );
        // frame.name = `${frame.filename}.${frame.ext}`;
        // frame.type = "image/jpg";
        ReactS3.upload(file, config)
          .then(data => console.log(data))
          .catch(err => console.error(err));
      });
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
    p.stroke(0);
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
