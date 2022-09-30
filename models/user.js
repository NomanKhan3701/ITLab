const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	posts: {
		type: [String],
		default: [],
	},
	img: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);