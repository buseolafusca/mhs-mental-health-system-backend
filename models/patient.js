var mongoose = require('../config/mongoose');
var bcrypt = require('bcryptjs');
var saltRounds = 10;
var uuidv1 = require('uuid/v1');

var Schema = mongoose.Schema;

var PatientSchema = new Schema({
  email: {
    type: 'String',
    required: true
  },
  password:{
    type: 'String',
    required: true
  },
  first_name: {
    type: 'String',
    required: true
  },
  last_name: {
    type: 'String',
    required: true
  },
  postcode: {
    type: 'String',
  },
  organisation_id: {
    type: Schema.Types.ObjectId,
    ref: 'PatientModel',
  },
  code: {
    type: 'String',
    default: uuidv1()
  },
  expiration_data: {
    type: Date,
    default: new Date(+new Date() + 1*24*60*60*1000)
  },
  is_live: {
    type: Boolean,
    default: false
  }
});

// hash user password before saving into database
PatientSchema.pre('save', function(next) {
  var salt = bcrypt.genSaltSync(saltRounds);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});


var PatientModel = mongoose.model('PatientModel', PatientSchema, 'patients');
module.exports = PatientModel;
