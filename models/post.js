const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	textContent: {
		type: String,
		required: true,
	},
	createdBy: {
		type: String,
		required: true,
	},
	img: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

module.exports = mongoose.models.Post || mongoose.model("Post", postSchema);
