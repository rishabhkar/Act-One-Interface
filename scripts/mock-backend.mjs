import http from 'http'
import fs from 'fs'
import path from 'path'

function jsonResponse(res, status, obj) {
  const body = JSON.stringify(obj)
  res.writeHead(status, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) })
  res.end(body)
}

function parseJson(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => (data += chunk))
    req.on('end', () => {
      try {
        // Debug: log raw incoming data for diagnosis
        console.log('\n[MOCK DEBUG] Raw body start ===')
        console.log(data.slice(0, 10000))
        console.log('=== Raw body end ===')

        // Write raw body to file for external inspection
        try {
          const outPath = path.resolve(process.cwd(), 'scripts', 'last-body.txt')
          fs.writeFileSync(outPath, data, { encoding: 'utf-8' })
        } catch (e) {
          console.error('Failed to write last-body.txt', e)
        }

        const parsed = data ? JSON.parse(data) : {}
        resolve(parsed)
      } catch (err) {
        // On parse error, include the raw body in the error log
        console.error('\n[MOCK DEBUG] JSON parse error, raw body was:')
        console.error(data)
        reject(err)
      }
    })
    req.on('error', reject)
  })
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/feedback') {
    try {
      const body = await parseJson(req)
      console.log('\n[MOCK] /api/feedback received:')
      console.log(JSON.stringify(body, null, 2))
      jsonResponse(res, 200, { message: 'Mock received feedback', received: body })
    } catch (err) {
      console.error(err)
      jsonResponse(res, 400, { message: 'Invalid JSON' })
    }
    return
  }

  if (req.method === 'POST' && req.url === '/api/donations') {
    try {
      const body = await parseJson(req)
      console.log('\n[MOCK] /api/donations received:')
      console.log(JSON.stringify(body, null, 2))
      jsonResponse(res, 200, { message: 'Mock received donation', received: body })
    } catch (err) {
      console.error(err)
      jsonResponse(res, 400, { message: 'Invalid JSON' })
    }
    return
  }

  jsonResponse(res, 404, { message: 'Not found' })
})

const PORT = Number(process.env.PORT || process.env.API_PORT || 8081)
server.listen(PORT, () => {
  console.log(`Mock backend listening on http://localhost:${PORT}`)
})