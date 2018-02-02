const express = require('express')
const app = express()
var Handlebars = require('handlebars');

var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
    "{{kids.length}} kids:</p>" +
    "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
var template = Handlebars.compile(source);

var data = { "name": "Homer", "hometown": "Springfield",
    "kids": [{"name": "Bart", "age": "10"}, {"name": "Lisa", "age": "8"}]};
var result = template(data);

app.get('/', (req, res) => res.send(result))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
