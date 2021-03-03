const port = process.env.PORT||80;
const express = require('express');
const app =express();
const result = require('dotenv').config();
const bodyParser= require('body-parser')
const { MongoClient } = require('mongodb');
const DATABASE_NAME = 'figDB';
const DB_URI = `mongodb://localhost:27017/${DATABASE_NAME}`;
const client = new MongoClient(process.env.MONGODB_URI || DB_URI);
let collection = null;
let db=null;
const jsonParser= bodyParser.json()
app.use('/canvas',express.static("Drawing"))
app.use(bodyParser.urlencoded({extended: true}))
async function GetCollection() {
    await client.connect();
    db = client.db(DATABASE_NAME)
    collection = db.collection('figures')
};
GetCollection()

app.get('/', function(req,res){
    res.send("Main Page!")
})
app.get('/hello', function(req,res){
    res.send("Hello World!")
})
app.use(bodyParser.urlencoded({extended: true}))
app.use(jsonParser)

app.post('/get', (req, res) => {
  user = req.body.user
  console.log("user: "+user)
  db.collection('figures').find({user: user}).toArray(function (err, result){
    if(err) throw err
    res.send(result)
  })
})

app.post('/send', (req, res) => {
    //Add to mongo db
  db.collection('figures').insertOne(req.body, function(err, res){
    if(err) throw err
    console.log('1 Document inserted')
  })
  res.status(200).json({
    message: 'OK'
  })
})
  
app.listen(port,function(){
    console.log("Server is listening at default port! "+port)
})
