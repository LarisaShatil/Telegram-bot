const axios = require("axios");
const config = require("../config/config.js").web;

function getNewLoginUrl() {
  console.log("getNewLoginUrl");
  const params = new URLSearchParams({
    client_id: config.client_id,
    redirect_uri: config.redirect_uris[0],
    response_type: "code",
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/photoslibrary.readonly",
    state: "new_access_token",
    include_granted_scopes: "true",
    prompt: "consent",
  });

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  return axios.get(url);
}
function getNewRefreshToken(code) {
  var data = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    code,
    grant_type: "authorization_code",
    redirect_uri: config.redirect_uris[0],
  };
  const axioConfig = {
    method: "post",
    url: "https://oauth2.googleapis.com/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    params: data,
  };
  return axios(axioConfig);
}

function getAccessToken(refreshToken) {
  const params = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  };
  const apiConfig = {
    method: "post",
    url: "https://oauth2.googleapis.com/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    params,
  };
  return axios(apiConfig);
}

module.exports = {
  getNewLoginUrl,
  getNewRefreshToken,
  getAccessToken,
}