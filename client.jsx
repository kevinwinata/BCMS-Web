var React = require('react'),
	injectTapEventPlugin = require("react-tap-event-plugin"),
	BCMSToolbar = require('./components/bcmstoolbar.jsx'),
	MapVisualization = require('./components/mapvisualization.jsx'),
	TimeVisualization = require('./components/timevisualization.jsx'),
	WordVisualization = require('./components/wordvisualization.jsx');

window.React = React;

injectTapEventPlugin();

React.render(<BCMSToolbar />, document.getElementById('bcms-toolbar'));

$("#button-post").click(function() {
	var str = $( ".mui-menu-label" ).text();
	var df = "2/2/2015";
	var dt = "2/3/2015";

	if (str == "Berdasarkan Lokasi") {
		$.get('/map', { datefrom: df, dateto: dt }, function(data) {
			React.render(<MapVisualization data={data}/>, 
				document.getElementById('bcms-visualization'));
		});
	}
	else if (str == "Berdasarkan Waktu") {
		$.get('/time', { datefrom: df, dateto: dt }, function(data) {
			React.render(<TimeVisualization data={data}/>, 
				document.getElementById('bcms-visualization'));
		});
	}
	else if (str == "Berdasarkan Frekuensi") {
		$.get('/word', { datefrom: df, dateto: dt }, function(data) {
			React.render(<WordVisualization data={data}/>, 
				document.getElementById('bcms-visualization'));
		});
	}
});
