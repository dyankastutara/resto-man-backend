var mongoose = require('mongoose')
var Schema = mongoose.Schema;
require('../config/reportdb')

var weekSchema = new Schema({
	date: String,
	reports : Schema.Types.Mixed
}, {timestamps: true})

module.exports = mongoose.model('Week',weekSchema)