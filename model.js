const mongoose = require("mongoose");

let FormSchema = new mongoose.Schema({
    name:String,
     subject:String,
    message:String,
	email: {
		type: String,
		required: true,
		unique: true
	}
});

module.exports = mongoose.model('FormKarman', FormSchema);