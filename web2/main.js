const express = require('express');
const router = express.Router();

const app = express();
const port = 8088;

app.use(express.static('basic'));

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});