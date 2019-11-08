const mongoose = require('../config/db')

let Schema = mongoose.Schema

const adminSchema = new Schema({
	adminName: {
		type: String,
		required: true
	},
	adminPwd: {
		type: String,
		required: true
	},
	historys: [{
		type: Number,                             
		name: String                                
	}],
	level: Number,
	created_at: { type : Date, default : Date.now },
  	updated_at: { type : Date, default : Date.now }
})

adminSchema.statics.adminLogIn = function(data, cb) {
	return this.findOne({'adminName':data.uname,'adminPwd':data.upwd}).exec(cb)
}

const adminListModel = module.exports = mongoose.model('adminlist',adminSchema)
