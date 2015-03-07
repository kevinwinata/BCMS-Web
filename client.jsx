var React = require('react'),
	injectTapEventPlugin = require("react-tap-event-plugin"),
	BCMSToolbar = require('./components/bcmstoolbar.jsx'),
	Visualization = require('./components/visualization.jsx'),
	datefrom = new Date(), 
	dateto = new Date();

window.React = React;
injectTapEventPlugin();

React.render(<BCMSToolbar />, document.getElementById('bcms-toolbar'));
