import uuid from "uuid";
import AWS from "../api/aws.js";

import "p5/lib/addons/p5.sound";
import p5 from "p5";

let loop = true;
let mic;
let diameter;

let colors = [
  "rgb(203, 212, 194)",
  "rgb(219, 235, 192)",
  "rgb(195, 178, 153)",
  "rgb(129, 83, 85)",
  "rgb(82, 50, 73)"
];

export default function sketch(p) {
  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(10);
    console.log("mic is", mic);
    mic = new p5.AudioIn()
    mic.start();
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    colors = props.colors;
    console.log(props);
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
        mic.stop();
        mic.dispose();
        p.remove();
      });
    } else if (props.backClicked) {
      mic.stop();
      mic.dispose();
      p.remove();
      props.history.push("/dashboard");
    }
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
    let level = mic.getLevel();
    diameter = p.map(level, 0, 1, 5, 2000);

    let x = p.mouseX + (Math.random() - 0.5) * (Math.random() * 100);
    let y = p.mouseY + (Math.random() - 0.5) * (Math.random() * 100);
    for (let i = 0; i < 3; i++) {
      p.noStroke();
      p.fill(colors[Math.floor(Math.random() * colors.length)]);
      p.ellipse(x, y, diameter, diameter);
    }
  };

  p.draw = function() {
    p.circles();
  };
}
