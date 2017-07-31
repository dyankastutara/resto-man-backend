var mongoose = require('mongoose')
var Schema = mongoose.Schema;
require('../config/reportdb')

var reportSchema = new Schema({
	date: String,
	reports : Schema.Types.Mixed
}, {timestamps: true})

module.exports = mongoose.model('Report',reportSchema)