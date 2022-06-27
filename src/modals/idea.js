const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String, required: true, trim: true },
		idea_image: {
			uploaded_at: {
				type: Date,
			},
			title: { type: String },
			img: {
				data: Buffer,
				contentType: String,
			},
		},
		field: {
			type: String,
			enum: [
				'Information Technology',
				'Medical Technology',
				'Communications Technology',
				'Industrial and Manufacturing Technology',
				'Education Technology',
				'Construction Technology',
				'Aerospace Technology',
				'Biotechnology',
				'Agriculture Technology',
				'Electronics Technology',
				'Military Technology',
				'Robotics Technology',
				'Artificial Intelligence Technology',
				'Assistive Technology',
				'Entertainment Technology',
				'Sports Technology',
				'Vehicle Technology',
				'Environmental Technology',
				'3D Printing Technology',
			],
			required: true,
		},
		status: {
			type: String,
			enum: ['active', 'inactive', 'finished'],
			default: 'active',
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		completion: {
			type: Number,
			min: 0,
			max: 100,
			default: 0,
		},
		partners: [
			{
				partner: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'User',
				},
			},
		],
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
const Idea = mongoose.model('Idea', ideaSchema);
module.exports = Idea;
