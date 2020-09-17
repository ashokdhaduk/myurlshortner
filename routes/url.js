const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const Url = require("../models/Url");

// @route POST /api/url/shorten
// @desc Create a short URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.baseUrl;

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  // Create url code
  const urlCode = generateUniqueId();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      // Check if Url exists in Database
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.send(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode
        });
        await url.save();
        return res.json(url);
      }
    } catch (err) {
      console.error(err.message);
      return res.status(500).json("Server Error");
    }
  } else {
    return res.status(400).json("Invalid url");
  }
});

// Generate unique 5 char unique id using base62
function generateUniqueId() {
  const base62chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var rtn = '';
  for (var i = 0; i < 5; i++) {
      rtn += base62chars.charAt(Math.floor(Math.random() * base62chars.length));
  }
  return rtn;
}

module.exports = router;
