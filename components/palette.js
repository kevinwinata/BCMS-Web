var palette = {
	
	colors: [
		'#F44336', '#3F51B5', '#009688', '#FFEB3B', '#795548',
		'#E91E63', '#2196F3', '#4CAF50', '#FFC107', '#9E9E9E',
		'#9C27B0', '#03A9F4', '#74D108', '#FF9800', '#607D8B',
		'#673AB7', '#00BCD4', '#CDDC39', '#FF5722'
	],

	getColor: function(i) {
		return palette.colors[i%(palette.colors.length)];
	},

	getRandomColor: function() {
		return palette.colors[Math.floor(Math.random() * palette.colors.length)];
	}

};
module.exports = palette;