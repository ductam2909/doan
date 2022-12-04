const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema(
  {
    idTour: {
      type: String
    },
    idUser: {
      type: String
    },
    avatar: {
      type: Array
    },
    message: {
      type: String
    },
    reply: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Comments', commentsSchema)
