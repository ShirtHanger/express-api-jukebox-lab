const mongoose = require('mongoose')
/* Above is if it's just one model */
/* Below for rmultiple */
/* const { Schema } = require('mongoose') */

const trackSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    album: { type: String, required: true },
    artist: { type: String, required: true },
  },
  { timestamps: true }
)

/* This won't work for this specific API */
// module.exports = trackSchema

const Track = mongoose.model('Track', trackSchema)

module.exports = Track

/* If there is only one schema, you can do the models index function here */