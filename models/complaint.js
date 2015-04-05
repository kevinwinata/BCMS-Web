var mongoose = require('mongoose');

var complaintSchema = mongoose.Schema({
	id: String,
	text: String,
	timestamp: Number,
	destinations: [Boolean],
	entities: [
		{ 
			name: String, 
			class: String 
		}
	],
	relations: [
		{ 
			entity1: String,
			entity2: String,
			class: String 
		}
	],
	topic: String,
	location: {
		name: String,
		latitude: String,
		longitude: String
	}
});

var Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;