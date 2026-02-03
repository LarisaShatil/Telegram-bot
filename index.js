require('dotenv').config();
const express = require("express");
const PORT = process.env.PORT || 4040;
const { handler } = require("./controller");

const app = express();
app.use(express.json());


app.get(["/", "/test", "/test-2","/gtoken", "/get-access-token"], async (req, res) => {
  res.send(await handler(req));
});

app.post("/", async (req, res) => {
  res.send(await handler(req));
});

app.listen(PORT, function (err) {
  if (err) console.log("ERROR: ------->", err);
  console.log("Server listening on PORT", PORT);
});