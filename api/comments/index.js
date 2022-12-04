const express = require('express')
const router = express.Router()

const Comments = require('./model')

// @route:  GET /api/comments/
// @desc:   Lấy ra tất cả comments trong hệ thống
router.get('/', async (req, res) => {
  try {
    const limit = Number(req?.query?.limit || 100)
    const skip = Number(req?.query?.skip || 0) * limit
    const comments = await Comments.find().sort({ createdAt: 1 }).skip(skip).limit(limit)
    const count = await Comments.count()
    res.status(200).json({ comments, count })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  POST /api/comments/
// @desc:   Thêm mới comments
router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ msg: 'Vui lòng nhập đầy đủ thông tin' })
    }
    const newcomments = new Comments(req.body)
    newcomments.save(function (error) {
      if (error) {
        const errors = []
        Object.keys(error?.errors).forEach(function (key) {
          errors.push(error?.errors[key].message)
        })
        return res.status(400).json({ errors })
      } else {
        res.status(201).json({ comments: newcomments, msg: 'thêm mới thành công' })
      }
    })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  GET /api/comments/:id
// @desc:   Lấy thông tin chi tiết của comments
router.get('/:id', async (req, res) => {
  try {
    const comments = await Comments.findById(req.params.id)
    if (!comments) {
      return res.status(404).json({ msg: 'Tour không tồn tại' })
    }
    res.status(200).json({ comments })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  put /api/comments/:id
// @desc:   Cập nhật thông tin comments
router.put('/:id', async (req, res) => {
  try {
    const comments = await Comments.findById(req.params.id)
    if (!comments) {
      return res.status(404).json({ msg: 'Tour không tồn tại' })
    }
    const updateComments = await Comments.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(201).json({ comments: updateComments, msg: 'cập nhật thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  DELETE /api/comments/:id
// @desc:   Xóa comments
router.delete('/:id', async (req, res) => {
  try {
    const comments = await Comments.findById(req.params.id)
    if (!comments) {
      return res.status(404).json({ msg: 'Tour không tồn tại' })
    }
    await Comments.findByIdAndDelete(req.params.id)

    res.status(201).json({ msg: 'xóa Tour thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
