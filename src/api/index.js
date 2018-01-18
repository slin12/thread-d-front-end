//this file has all our fetch requests to our rails backend

const url = "https://threadd.herokuapp.com/";

//to make sure if our token changes, we call this function every time
const getHeaders = () => {
  return {
    "content-type": "application/json",
    accept: "application/json",
    Authorization: localStorage.getItem("token")
  };
};

class AuthAdapter {
  static signup(params) {
    return fetch(`${url}/users`, {
      method: "post",
      headers: getHeaders(),
      body: JSON.stringify({
        user: {
          name: params.name,
          email: params.email,
          password: params.password,
          password_confirmation: params.passwordConfirm
        }
      })
    }).then(res => res.json());
  }

  static login(params) {
    return fetch(`${url}/auth`, {
      method: "post",
      headers: getHeaders(),
      body: JSON.stringify(params)
    }).then(res => res.json());
  }

  //if they already have a token in localStorage
  static authorizeUser() {
    return fetch(`${url}/auth`, {
      headers: getHeaders()
    }).then(res => res.json());
  }

  static createPattern(imageUrl) {
    return fetch(`${url}/patterns`, {
      method: "post",
      headers: getHeaders(),
      body: JSON.stringify({ url: imageUrl })
    }).then(res => res.json());
  }

  static deleteColor(colors) {
    return fetch(`${url}/users/colors`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ colors })
    }).then(res => res.json());
  }

  static createColor(colors) {
    return fetch(`${url}/users/colors`, {
      method: "post",
      headers: getHeaders(),
      body: JSON.stringify({ colors })
    }).then(res => res.json());
  }
}

export default AuthAdapter;
