//imports
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const connection = require('./config/db.connection.js');
const cerealController = require('./controllers')


const PORT = 4000;

//set app
app.set('view engine', 'ejs');

//app.use for adding
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'))

// routes
// app.get("/cereal", function(req, res) {
//     res.render("index.ejs")
// })

app.get("/cereal/new", function(req, res) {
    res.render("new.ejs")
})

app.listen(PORT, function() {
    console.log(`I am listening on port ${PORT}`)
});