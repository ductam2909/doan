const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('./model')
const auth = require('../../middleware/auth')
const upload = require('../../middleware/imageUpload')

// @route:  POST /api/auth/signup
// @desc:   Register a new user
router.post('/signup-user', async (req, res) => {
  const { email, password } = req.body
  try {
    if (!req.body) {
      return res.status(400).json({ errors: ['Vui lòng nhập đầy đủ thông tin'] })
    }
    if (password.length < 6) {
      return res.status(400).json({ errors: ['Mật khẩu tối thiểu 6 ký tự'] })
    }
    const user = await User.findOne({ email: email.toLowerCase() })
    if (user) {
      return res.status(400).json({ errors: ['Email đã tồn tại'] })
    }
    const newusers = new User(req.body)
    // Hash the password
    newusers.password = await bcrypt.hash(password, 10)
    newusers.save(function (error) {
      if (error) {
        const errors = []
        Object.keys(error?.errors).forEach(function (key) {
          errors.push(error?.errors[key].message)
        })
        return res.status(400).json({ errors })
      } else {
        res.status(201).json({ users: newusers, msg: 'Đăng kí thành công' })
      }
    })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  GET /api/auth/me
// @desc:   Get logged in user's info
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    if (!user) {
      return res.status(404).json({
        msg: 'Không thể tìm thấy người dùng này'
      })
    }
    res.status(200).json({ user })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  GET /api/user/
// @desc:   Lấy ra tất cả user trong hệ thống
router.get('/', async (req, res) => {
  try {
    const limit = Number(req?.query?.limit || 10)
    const skip = Number(req?.query?.skip || 0) * limit
    const users = await User.find().sort({ createdAt: 1 }).skip(skip).limit(limit)
    const count = await User.count()
    res.status(200).json({ users, count })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  GET /api/user/:id
// @desc:   Lấy thông tin chi tiết của user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'Tour không tồn tại' })
    }
    res.status(200).json({ user })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  POST /api/authuser
// @desc:   Login user
router.post('/', async (req, res) => {
  const { email, password } = req.body

  if (password && password.length < 6) {
    return res
      .status(400)
      .json({ msg: 'Mật khẩu tối thiểu 6 ký tự' })
  }

  try {
    // Check if user is registered
    const user = await User.findOne({ email: email && email.toLowerCase() }).select(
      '+password'
    )

    if (!user) {
      return res.status(400).json({ msg: 'Email không tồn tại' })
    }

    // Check if password is correct
    const isCorrectPassword = await bcrypt.compare(String(password), String(user.password))
    if (!isCorrectPassword) {
      return res.status(400).json({ msg: 'Mật khẩu không đúng' })
    }

    // Sign JWT and return token
    jwt.sign({ userId: user._id }, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err
      res.status(200).json({ token })
    })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  PUT /api/auth/me
// @desc:   Update user settings
router.put('/me', auth, upload.single('profilePic'), async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ msg: 'Email is required' })
    }
    // Check if username is already taken
    let user = await User.findOne({ email: email.toLowerCase() })
    if (user && user._id.toString() !== req.userId) {
      return res.status(400).json({ msg: 'Email đã được sử dụng' })
    }
    const updatedUser = {
      ...req.body
    }
    if (req.file && req.file.path) updatedUser.profilePicUrl = req.file.path

    user = await User.findByIdAndUpdate(req.userId, updatedUser, { new: true })

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ msg: 'Server error' })
  }
})


// @route:  put /api/user/:id
// @desc:   Cập nhật thông tin User
router.put('/:id', async (req, res) => {
  try {
    const users = await User.findById(req.params.id)
    if (!users) {
      return res.status(404).json({ msg: 'User không tồn tại' })
    }
    const updateUsers = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(201).json({ users: updateUsers, msg: 'cập nhật thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})


// @route:  PUT /api/auth/password
// @desc:   Update password
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    const user = await User.findById(req.userId).select('+password')
    if (!user) {
      return res.status(404).json({ msg: 'Không tìm thấy người dùng' })
    }

    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(401).json({ msg: 'Mật khẩu không đúng' })
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ msg: 'Mật khẩu tối thiểu 6 ký tự' })
    }

    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()

    res.status(200).json({ msg: 'Password updated' })
  } catch (error) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// @route:  DELETE /api/user/:id
// @desc:   Xóa user
router.delete('/:id', async (req, res) => {
  try {
    const users = await User.findById(req.params.id)
    if (!users) {
      return res.status(404).json({ msg: 'Người dùng không tồn tại' })
    }
    await User.findByIdAndDelete(req.params.id)

    res.status(201).json({ msg: 'Xóa người dùng thành công' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
