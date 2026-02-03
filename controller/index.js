const { getNewLoginUrl, getNewRefreshToken, getAccessToken } = require("./library/google-auth");
const { handleMessage } = require("./library/Telegram");
const { getAllMedia} = require("./library/google-photos")

async function handler(req) {
  const { method, url } = req;
  try {
    if (method === "GET") {
      if (url === "/test") {
        const data = await getNewLoginUrl();
        const parseUrl = data.config.url.replace(/\s/g,"")
        return parseUrl;
      }
      if (url === "/test-2") {
        console.log("TEST---2");
        const accessTokenData = await getAccessToken(process.env.GOOGLE_REFRESH_TOKEN);
        const access_token = accessTokenData.data.access_token;
        const data = await getAllMedia(access_token);
        if (data) {
          console.log("DATA : ", data);
          return JSON.stringify(data);
        }
        // console.log("DATA : ", data);
        // return JSON.stringify(data);
      }
      if (url === "/get-access-token") {
        //expires in 5 days in testing mode
        const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
        const accessTokenData = await getAccessToken(refreshToken);
        const access_token = accessTokenData.data.access_token;
        return access_token;
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
  } catch (err) {
    console.log("ERROR ->", err.response.data);
}
}

module.exports = { handler };