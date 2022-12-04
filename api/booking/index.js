const express = require('express')
const router = express.Router()

const Bookings = require('./model')

// @route:  GET /api/Bookings/
// @desc:   Lấy ra tất cả Bookings trong hệ thống
router.get('/', async (req, res) => {
  try {
    const limit = Number(req?.query?.limit || 100)
    const skip = Number(req?.query?.skip || 0) * limit
    const bookings = await Bookings.find().sort({ createdAt: 1 }).skip(skip).limit(limit)
    const count = await Bookings.count()
    res.status(200).json({ bookings, count })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  POST /api/Bookings/
// @desc:   Thêm mới Bookings
router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ msg: 'Vui lòng nhập đầy đủ thông tin' })
    }
    const newbookings = new Bookings(req.body)
    newbookings.save(function (error) {
      if (error) {
        const errors = []
        Object.keys(error?.errors).forEach(function (key) {
          errors.push(error?.errors[key].message)
        })
        return res.status(400).json({ errors })
      } else {
        res.status(201).json({ bookings: newbookings, msg: 'thêm mới thành công' })
      }
    })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  GET /api/bookings/:id
// @desc:   Lấy thông tin chi tiết của bookings
router.get('/:id', async (req, res) => {
  try {
    const bookings = await Bookings.findById(req.params.id)
    if (!bookings) {
      return res.status(404).json({ msg: 'Tour không tồn tại' })
    }
    res.status(200).json({ bookings })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  put /api/bookings/:id
// @desc:   Cập nhật thông tin bookings
router.put('/:id', async (req, res) => {
  try {
    const bookings = await Bookings.findById(req.params.id)
    if (!bookings) {
      return res.status(404).json({ msg: 'Tour không tồn tại' })
    }
    const updatebookings = await Bookings.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(201).json({ Bookings: updatebookings, msg: 'cập nhật thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  DELETE /api/bookings/:id
// @desc:   Xóa bookings
router.delete('/:id', async (req, res) => {
  try {
    const bookings = await Bookings.findById(req.params.id)
    if (!bookings) {
      return res.status(404).json({ msg: 'Tour không tồn tại' })
    }
    await Bookings.findByIdAndDelete(req.params.id)

    res.status(201).json({ msg: 'xóa Tour thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
