const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())

const items = [
  {
    id: 1,
    name:"aaa"
  },
  {
    id: 2,
    name:"bbb"
  },
      {
    id: 3,
    name:"ccc"
  },

]

app.all('/items', (req, res) => {
  res.json(items)
})

module.exports = app
