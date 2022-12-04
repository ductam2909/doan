const mongoose = require('mongoose')

const blogsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nhập tên bài viết']
    },
    avatar: {
      type: String,
      required: [true, 'Nhập hình ảnh bài viết']
    },
    description: {
      type: String,
      required: [true, 'Nhập nội dung']
    },
    detail: {
      type: String,
      required: [true, 'Nhập trích dẫn']
    },
    idUser: {
      type: String
    },
    status: {
      type: String
    },
    category: {
      type: String
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Blogs', blogsSchema)
