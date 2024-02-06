const https = require('https')

const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const Chip = require('Chip').default

const {
  brandId,
  apiKey,
  endpoint,
  basedUrl,
  webhookPublicKey,
} = require('./config')

const app = express()
const port = 7001

app.use(function (req, res, next) {
  req.rawBody = ''
  req.setEncoding('utf8')

  req.on('data', function (chunk) {
    if (chunk) req.rawBody += chunk
  })

  req.on('end', function () {
    next()
  })
})

app.use(cors())

Chip.ApiClient.instance.basePath = endpoint
Chip.ApiClient.instance.token = apiKey
const apiInstance = new Chip.PaymentApi()

app.get('/', async (req, res) => {
  fs.readFile('./index.html', null, function (error, data) {
    if (error) {
      res.writeHead(404)
      respone.write('Whoops! File not found!')
    } else {
      res.write(data)
    }
    res.end()
  })
})

app.get('/api/payment_methods', async (req, res) => {
  apiInstance.paymentMethods(
    brandId,
    'MYR',
    {},
    function (error, data, response) {
      if (error) {
        console.log('API call failed. Error:', error)
        res.end()
        return
      }
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(data))
    },
  )
})

app.get('/api/create_purchase', async (req, res) => {
  const client = { email: 'test@test.com' }
  const product = { name: 'Test', price: 5500 }
  const details = { products: [product] }
  const purchase = {
    brand_id: brandId,
    client: client,
    purchase: details,
    success_redirect: `${basedUrl}/redirect?success=true`,
    failure_redirect: `${basedUrl}/redirect?success=false`,
    /** 
     * Uncomment this line if you want to test callback,
     * baseUrl need to change to your
     * */ 
    // success_callback: `${basedUrl}/api/callback`, 
  }

  apiInstance.purchasesCreate(
    purchase,
    function (error, data, response) {
      if (error) {
        console.log('API call failed. Error:', error)
        res.end()
        return
      }
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(data))
    },
  )
})

app.post('/api/callback', async (req, res) => {
  const { rawBody, headers } = req
  const xsignature = headers['x-signature']
  const publicKey = JSON.parse(await getPublicKey())

  const verified = apiInstance.verify(
    rawBody,
    Buffer.from(xsignature, 'base64'),
    publicKey,
  )
  console.log('/callback VERIFIED: ', verified)
  res.end()
})

app.get('/api/public_key', async (req, res) => {
  const data = await getPublicKey()
  res
    .setHeader('Content-Type', 'application/json')
    .end(JSON.parse(data))
})

app.get('/redirect', async (req, res) => {
  res.sendFile(path.join(__dirname, '/redirect.html'))
})

const getPublicKey = () => {
  return new Promise((resolve, reject) => {
    let data = ''
    https
      .get(
        `${endpoint}/public_key/`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
        response => {
          response.on('data', chunk => {
            data = chunk.toString()
          })

          response.on('end', () => {
            resolve(data)
          })
        },
      )
      .on('error', err => {
        console.log('Error: ', err.message)
        reject(err)
      })
  })
}

app.listen(port, () => {
  return console.log(
    `Express is listening at http://localhost:${port}`,
  )
})
