const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

/*
 * @route GET /:code
 * @desc  Redirect to long/original URL
 */

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      // Update clicks count
      await url.update({ $inc: { clicks: 1 } });
      // Track client data
      
      // Check link is expired
      const curDate = Date.now();
      url.date.setMonth(url.date.getMonth()+1);
      if (curDate > url.date) {
        return res.status(404).json("Link is expired");
      } else {
        return res.redirect(url.longUrl);
      }
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json("Server Error");
  }
});

module.exports = router;
