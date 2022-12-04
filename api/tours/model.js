const mongoose = require('mongoose')

const toursSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nhập tên tour']
    },
    avatar: {
      type: Array,
      required: [true, 'Nhập hình ảnh tour']
    },
    date: {
      type: String
    },
    description: {
      type: String,
      required: [true, 'Nhập nội dung']
    },
    detail: {
      type: String,
      required: [true, 'Nhập trích dẫn']
    },
    price: {
      type: String,
      required: [true, 'Nhập giá tour']
    },
    address: {
      type: String,
      required: [true, 'Nhập địa chỉ']
    },
    time: {
      type: String,
      required: [true, 'Nhập thời gian']
    },
  }
)

module.exports = mongoose.model('Tours', toursSchema)
