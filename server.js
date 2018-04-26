const express = require('express')
const basicAuth = require('express-basic-auth')
const app = express()

const staticServer = express.static('build')

app.get(/private/, basicAuth({
  users: {foo: 'bar'},
  challenge: true,
}), staticServer)
app.use(staticServer)

const listener = app.listen(0, () =>
  console.log(`http://localhost:${ listener.address().port }`)
)
