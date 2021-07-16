const express = require('express')
const cors = require('cors')
const yaml = require('yaml')

const app = express()

app.use(cors())

// yaml parser middleware lol
app.use(async (req, _, next) => {
  try {
    let body = ''
    for await (const chunk of req) body += chunk
    req.body = yaml.parse(body)
    next()
  } catch (error) {
    next(error)
  }
})

app.get('/', (_, res) => {
  res.set('Content-Type', 'text/vnd.yaml')
  res.
    status(200).
    send(
      yaml.stringify(
        { 
          message: 'you did it!',
          users: [
            { name: 'thomas', age: 21 },
            { name: 'jason', age: 30 }
          ]
        }
      )
    )
})

app.post('/', (req, res) => {
  res.json(req.body)
})

app.listen(5000, () => console.log("open http://localhost:5000"))