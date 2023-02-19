// import library
const mongoose = require('mongoose');

// connect to the db
mongoose.connect('mongodb://127.0.0.1:27017/todo_listdb');

// acquire the connection (to check if it is succesfull)
const db = mongoose.connection;

//error
db.on('err',console.error.bind(console,'error connnecting the db'));

// up and running successfully

db.once('open',function(){
    console.log('successfully connected to the db');
});