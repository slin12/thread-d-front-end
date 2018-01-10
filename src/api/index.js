const url = "http://localhost:3000";

const getHeaders = () => {
  return {
    "content-type": "application/json",
    accept: "application/json",
    Authorization: localStorage.getItem("jwt")
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
}

export default AuthAdapter;
