const mongoose = require('mongoose');

const fundSchema = new mongoose.Schema(
	{
		amount: { type: Number, required: true },
		from: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		to: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		idea: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Idea',
		},
		issued_on: {
			type: Date,
			require: true,
		},
		issued_type: {
			type: String,
			enum: ['cash', 'card', 'netbanking', 'UPI'],
			required: true,
		},
		status: {
			type: String,
			enum: ['released', 'in-progress'],
			required: true,
		},
	},
	{ timestamps: true }
);

//Removing critical information while sending the object
ideaSchema.methods.toJSON = function () {
	const idea = this.toObject();
	idea['created_at'] = idea['createdAt'];
	idea['updated_at'] = idea['updatedAt'];
	delete idea.createdAt;
	delete idea.updatedAt;
	return idea;
};
const Fund = mongoose.model('Fund', fundSchema);
module.exports = Fund;
