import axios from "axios";

//No route url needed because of proxy in package.json
const SIGNUP_URL = "/signup";
const SIGNIN_URL = "/signin";

//Signup user
const signup = async (userData) => {
  //Signup user
  const response = await axios.post(SIGNUP_URL, userData);
  console.log("Response", response);
  //We set the access token in local storage to use for requests
  if (response.data) {
    //set token and userdata in local storage
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  //return data so we can set
  return response.data;
};

//Signin user
const signin = async (userData) => {
  const response = await axios.post(SIGNIN_URL, userData);
  if (response.data) {
    //set token and userdata in local storage
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//Logout User
const logout = () => {
  //Remove tokenn from localstorage
  localStorage.removeItem("user");
};

//Export signup function
const authService = {
  signup,
  logout,
  signin,
};

export default authService;
