import ReactS3 from "../react-s3";

const config = {
  bucketName: "thread-d",
  region: "us-east-1",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET
};

export default class AWS {
  static dataURItoBlob = dataURI => {
    const binary = atob(dataURI.split(",")[1]);
    let array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
  };

  static sendFile = file => {
    return ReactS3.upload(file, config);
  };
}
