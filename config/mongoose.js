//Set up default mongoose connection
var mongoose = require('mongoose');
var mongoDB_URI = require('../env/database')

mongoose.connect(mongoDB_URI, { useNewUrlParser: true });

//Bind connection to error event (to get notification of connection errors)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.set('useFindAndModify', true);

module.exports = mongoose;
