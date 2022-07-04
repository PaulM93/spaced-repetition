import axios from "axios";

//No route url needed because of proxy in package.json

//Signup user
const signup = async (userData) => {
  //Signup user
  const response = await axios.post("/signup", userData);
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
  const response = await axios.post("/signin", userData);
  if (response.data) {
    //set token and userdata in local storage
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//Logout User
const signout = () => {
  console.log("activated");
  //Remove tokenn from localstorage
  localStorage.removeItem("user");
};

//Export signup function
const authService = {
  signup,
  signout,
  signin,
};

export default authService;
