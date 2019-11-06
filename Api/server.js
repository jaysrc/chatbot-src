require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Route = require('./Route');
const config = require('./DB');

/*mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log('database is connected')
  },
  err => {
    console.log(err);
  }
)*/


const app = express()
const processMessage = require('./process-message')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('Route', Route)
app.post('/chat', (req, res) => {
  const { message } = req.body;
  processMessage(message)
  console.log(message);
})

app.get('/', (req,res) =>{
  res.json("hello")
})
app.listen(process.env.PORT || 4000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});












