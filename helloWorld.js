const express = require('express');
const app =express();
app.get('/', function(req,res){
    res.send("Hello World!")
})
app.listen(80,function(){
    console.log("Server is listening at default port!")
})
