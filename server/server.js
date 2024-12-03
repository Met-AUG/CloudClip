const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs')
const https = require('https')
const http = require('http')

const app = express()
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/cloudclip')

const ClipSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now }
})

const Clip = mongoose.model('Clip', ClipSchema)

app.post('/api/clipboard', async (req, res) => {
  try {
    const clip = new Clip({ content: req.body.content })
    await clip.save()
    res.json({ id: clip._id })
  } catch (error) {
    res.status(500).json({ error: '保存失败' })
  }
})

app.get('/api/clipboard/:id', async (req, res) => {
  try {
    const clip = await Clip.findById(req.params.id)
    if (clip) {
      res.json({ content: clip.content })
    } else {
      res.status(404).json({ error: '未找到剪贴内容' })
    }
  } catch (error) {
    res.status(500).json({ error: '获取失败' })
  }
})

const PORT = process.env.PORT || 3000
const SSL_PORT = process.env.SSL_PORT || 3443

const sslOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH || '/path/to/privkey.pem'),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH || '/path/to/fullchain.pem')
}

http.createServer(app).listen(PORT, () => {
  console.log(`HTTP 服务器运行在端口 ${PORT}`)
})

https.createServer(sslOptions, app).listen(SSL_PORT, () => {
  console.log(`HTTPS 服务器运行在端口 ${SSL_PORT}`)
})
