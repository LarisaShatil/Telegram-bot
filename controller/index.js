const { getNewLoginUrl, getNewRefreshToken, getAccessToken } = require("./library/google-auth");
const { handleMessage } = require("./library/Telegram");

async function handler(req) {
  const { method, url } = req;
  console.log("handler=====>>>> ", method, url);
  if (method === "GET" ) {
    if (url === "/test") {
      const data = await getNewLoginUrl();
      return data.config.url;
    }
    if (url === "/get-access-token") {
      //expires in 5 days
      const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
      const accessTokenData = await getAccessToken(refreshToken);
      return accessTokenData.data.access_token;
    }
    if (url.indexOf("/gtoken") !== -1) {
      const data = req.query;
      const refreshTokenData = await getNewRefreshToken(data.code);
      const refresh_token = refreshTokenData.data.refresh_token;
      return refresh_token;
    }
    return "Unknown request";
  }
  

  const { body } = req;
  if (body) {
    const messageObj = body.message;
    await handleMessage(messageObj);
  }
  return;
}

module.exports = { handler };