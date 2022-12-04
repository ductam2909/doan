require('dotenv').config({ path: './config.env' })

const express = require('express')
const http = require('http')
const next = require('next')
const connectDB = require('./server-utils/connectDB')

const app = express()
app.use(express.json({ extended: false, limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))
app.use(express.json())
const server = http.Server(app)
const dev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3000
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

connectDB()

nextApp.prepare().then(() => {
  app.use('/api/auth', require('./api/auth'))
  app.use('/api/user', require('./api/user'))
  app.use('/api/tours', require('./api/tours'))
  app.use('/api/comments', require('./api/comments'))
  app.use('/api/commentBlog', require('./api/commentBlog'))
  app.use('/api/booking', require('./api/booking'))
  app.use('/api/blog', require('./api/blog'))
  app.all('*', (req, res) => handle(req, res))
  server.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Express server running on port ${PORT}`)
  })
})
