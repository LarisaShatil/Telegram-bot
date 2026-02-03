const axios = require("axios");

async function getAllMedia(accessToken, pageToken = undefined, pageSize = 100) {
  console.log("getAllMedia  ***");
  return new Promise((resolve, reject) => {
    const params = {
      pageSize: pageSize,
      pageToken: pageToken,
    };

    const axioConfig = {
      method: "get",
      url: "https://photoslibrary.googleapis.com/v1/mediaItems",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      params:params,
    };
    axios(axioConfig)
      .then((response) => {
        const nextPageToken = response.data.nextPageToken;
        const mediaItems = response.data.mediaItems;
        mediaItems.forEach((item) => {
          finalSet.push(item.baseUrl);
        });
        if (nextPageToken) {
          getAllMedia(accessToken, nextPageToken).then((data) => {
            finalSet = finalSet.concat(data);
            resolve(finalSet);
          })
        } else {
          resolve(finalSet);
        }
      })
      .catch((err) => {
        reject(err);
    })
  })
}

module.exports = { getAllMedia };