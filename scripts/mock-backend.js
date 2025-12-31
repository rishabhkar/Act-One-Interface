import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json({ limit: '5mb' }))

app.post('/api/feedback', (req, res) => {
  console.log('\n[MOCK] /api/feedback received')
  console.log('Headers:', req.headers)
  console.log('Body:', JSON.stringify(req.body, null, 2))
  res.json({ message: 'Mock received feedback', received: req.body })
})

app.post('/api/donations', (req, res) => {
  console.log('\n[MOCK] /api/donations received')
  console.log('Headers:', req.headers)
  console.log('Body:', JSON.stringify(req.body, null, 2))
  res.json({ message: 'Mock received donation', received: req.body })
})

app.listen(8080, () => {
  console.log('Mock backend listening on http://localhost:8080')
})