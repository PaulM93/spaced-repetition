import axios from "axios";

//No route url needed because of proxy in package.json
const generateConfig = (accessToken) => {
  return {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
};

//Update Password
const changePassword = async (userData, accessToken) => {
  console.log("userdata", userData);
  const response = await axios.post(
    "/changePassword",
    userData,
    generateConfig(accessToken)
  );
  //   return console.log("reponse change", response.data);
  return response.data;
};

//Update Email
const changeEmail = async (userData, accessToken) => {
  const response = await axios.post(
    "/changeEmail",
    userData,
    generateConfig(accessToken)
  );
  if (response) {
    console.log("response", response.data);
  }

  return response.data;
};

const authService = {
  changeEmail,
  changePassword,
};
export default authService;
