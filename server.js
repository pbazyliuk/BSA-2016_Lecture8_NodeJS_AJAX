const express = require('express');
const app = express();

const bodyParser= require('body-parser');
var db;
const MongoClient = require('mongodb').MongoClient;



MongoClient.connect('mongodb://message-box-user:yoman123@ds027145.mlab.com:27145/message-box', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(4000, () => {
    console.log('listening on 4000')
  })
});

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.redirect('/')
  })
});

