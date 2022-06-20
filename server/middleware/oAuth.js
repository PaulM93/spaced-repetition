const axios = require("axios");

const tokenEndPoint = "https://dev-f6e5vo5z.us.auth0.com/oauth/token";

const oAuth = (req, res, next) => {
  const code = req.query.code;

  if (!code) {
    res.status(401).send("Missing autho code");
  }

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client", "HqXAZuYWj17eEEXBeLAMR3NibABBrxsq");
  params.append(
    "client_secret",
    "Pn8ZfX1N59S9UonRax4vlQp2Jr4y226DbFqNAV4KsUzwYuAnlVaVoFMrpSoRUDdS"
  );
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:3000/challenges");

  axios
    .post(tokenEndPoint, params)
    .then((response) => {
      req.oauth = response.data;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(403).json(`Reason: ${err.message}`);
    });
};

module.exports = oAuth;
