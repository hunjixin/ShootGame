var express = require('express')
var fs = require('fs')
var app = new express()

app.use(express.static(__dirname))

app.get('/', function (req, res) {
  var html = fs.readFileSync('/spec/simple/index.html')
  res.send(html)
})

app.listen(3001,function(){
  console.log("start http://127.0.0.1:3000/spec/simple/index.html")
})

