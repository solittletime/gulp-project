import gulpTemplate from './templates/gulp';

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send(gulpTemplate({ title: 'Getting started with Gulp' }));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
