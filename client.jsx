var React = require('react'),
	injectTapEventPlugin = require("react-tap-event-plugin"),
	BCMSToolbar = require('./components/bcmstoolbar.jsx'),
	Visualization = require('./components/visualization.jsx');

window.React = React;

injectTapEventPlugin();

React.render(<BCMSToolbar />, document.getElementById('bcms-toolbar'));

$("#button-post").click(function() {
	var str = $( ".mui-menu-label" ).text();
	var df = "2/2/2015";
	var dt = "2/3/2015";

	if (str == "Peta") {
		$.get('/map', { datefrom: df, dateto: dt }, function(data) {
			React.render(<Visualization mode={0} data={data}/>, 
				document.getElementById('bcms-visualization'));
		});
	}
	else if (str == "Arus") {
		$.get('/stream', { datefrom: df, dateto: dt }, function(data) {
			React.render(<Visualization mode={1} data={data}/>, 
				document.getElementById('bcms-visualization'));
		});
	}
	else if (str == "Kata") {
		$.get('/word', { datefrom: df, dateto: dt }, function(data) {
			React.render(<Visualization mode={2} data={data}/>, 
				document.getElementById('bcms-visualization'));
		});
	}
});
