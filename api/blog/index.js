const express = require('express')
const router = express.Router()

const Blogs = require('./model')

// @route:  GET /api/blogs/
// @desc:   Lấy ra tất cả blogs trong hệ thống
router.get('/', async (req, res) => {
  try {
    const limit = Number(req?.query?.limit || 10)
    const skip = Number(req?.query?.skip || 0) * limit
    const blogs = await Blogs.find().sort({ createdAt: 1 }).skip(skip).limit(limit)
    const count = await Blogs.count()
    res.status(200).json({ blogs, count })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})
// @route:  GET /api/blogs/
// @desc:   Lấy ra tất cả blogs trong hệ thống với category
router.get('/cat/:name', async (req, res) => {
  try {
    const limit = Number(req?.query?.limit || 10)
    const skip = Number(req?.query?.skip || 0) * limit
    const blogs = await Blogs.find({category : req.params.name}).sort({ createdAt: 1 }).skip(skip).limit(limit)
    const count = await Blogs.count()
    res.status(200).json({ blogs, count })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})
// @route:  GET /api/blogs/
// @desc:   Lấy ra tất cả category
router.get('/cat', async (req, res) => {
  try {
    const cates = await Blogs.distinct('category')
    console.log(cates);
    // const count = await cates.count()
    // console.log(count);
    res.status(200).json({ cates })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  GET /api/blogs/
// @desc:   Lấy ra tất cả category
router.get('/cat1', async (req, res) => {
  try {
    // const cates = await Blogs.group
    const cates = await Blogs.aggregate([
      {
        $group: {
          _id: '$category',
          blogs: { $push : "$$ROOT"},
        }
      }
    ]);
    // const count = await cates.count()
    // console.log(count);
    res.status(200).json({ cates })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})
// @route:  POST /api/blogs/
// @desc:   Thêm mới blogs
router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ msg: 'Vui lòng nhập đầy đủ thông tin' })
    }
    const newblogs = new Blogs(req.body)
    newblogs.save(function (error) {
      if (error) {
        const errors = []
        Object.keys(error?.errors).forEach(function (key) {
          errors.push(error?.errors[key].message)
        })
        return res.status(400).json({ errors })
      } else {
        res.status(201).json({ blogs: newblogs, msg: 'thêm mới thành công' })
      }
    })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  GET /api/blogs/:id
// @desc:   Lấy thông tin chi tiết của blogs
router.get('/:id', async (req, res) => {
  try {
    const blogs = await Blogs.findById(req.params.id)
    if (!blogs) {
      return res.status(404).json({ msg: 'Blog không tồn tại' })
    }
    res.status(200).json({ blogs })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  put /api/blogs/:id
// @desc:   Cập nhật thông tin blogs
router.put('/:id', async (req, res) => {
  try {
    const blogs = await Blogs.findById(req.params.id)
    if (!blogs) {
      return res.status(404).json({ msg: 'Blog không tồn tại' })
    }
    const updateblogs = await Blogs.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(201).json({ blogs: updateblogs, msg: 'cập nhật thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  DELETE /api/blogs/:id
// @desc:   Xóa blogs
router.delete('/:id', async (req, res) => {
  try {
    const blogs = await Blogs.findById(req.params.id)
    if (!blogs) {
      return res.status(404).json({ msg: 'Blog không tồn tại' })
    }
    await Blogs.findByIdAndDelete(req.params.id)

    res.status(201).json({ msg: 'xóa Blog thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
