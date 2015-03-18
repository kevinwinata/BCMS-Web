var React = require('react'),
	injectTapEventPlugin = require("react-tap-event-plugin"),
	Navbar = require('./components/navbar.jsx'),
	Toolbar = require('./components/toolbar.jsx');

window.React = React;
injectTapEventPlugin();

React.render(<Navbar />, document.getElementById('navbar'));
React.render(<Toolbar />, document.getElementById('toolbar'));
