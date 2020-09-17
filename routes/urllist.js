const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

/*
 * @route GET /urllist
 * @desc  Gets all saved URLs
 */

router.get("/urllist", async (req, res) => {
  try {
    const urls = await Url.find({});
    if (urls) {
      return res.status(200).json(urls);
    } else {
      return res.status(404).json("No urls found");
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json("Server Error");
  }
});

module.exports = router;
