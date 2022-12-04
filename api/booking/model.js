const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema(
  {
    idTour: {
      type: String
    },
    idUser: {
      type: String
    },
    date: {
      type: String
    },
    adults: {
      type: String
    },
    child: {
      type: String
    },
    note: {
      type: String
    },
    total: {
      type: String
    },
    status: {
      type: String
    }
  }
)

module.exports = mongoose.model('Bookings', commentsSchema)
