const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      markdown: {
        type: String,
       
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
})

const artiul = mongoose.model('Article', articleSchema)

module.exports = artiul