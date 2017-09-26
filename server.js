var express=require('express')
var fs=require('fs')
var app=new express()

app.use(express.static('/home/hunjixin/CodeSpace/CrashDownApp/CrashDownApp/docs'));

app.get('/',function(req,res){
    var html=fs.readFileSync('/index.html')
res.send(html)
})
app.listen(3000);