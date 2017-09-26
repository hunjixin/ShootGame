var express=require('express')
var app=new express()

app.use(express.static(__dirname__,'public'))

app.listen(3000);