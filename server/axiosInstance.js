const axios = require("axios");
const crypto = require("crypto");
const keys = require("./config/keys");

const timestamp = new Date().getTime().toString();

const instance = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
  params: {
    apikey: keys.MARVEL_PUBLIC,
    ts: timestamp,
    hash: crypto
      .createHash("md5")
      .update(timestamp + keys.MARVEL_PRIVATE + keys.MARVEL_PUBLIC)
      .digest("hex")
  }
});

module.exports = instance;
