const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: {
      type: String,
      required: true
    },
    shortUrl: {
      type: String,
      required: true
    },
    clicks: { 
      type: Number, 
      default: 0 
    }, 
    date: { 
      type: Date, 
      default: Date.now 
    }
});

module.exports = mongoose.model('Url',urlSchema);  