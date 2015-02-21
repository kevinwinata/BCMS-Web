(function () {
	var React = require('react'),
		injectTapEventPlugin = require("react-tap-event-plugin"),
		BCMSToolbar = require('./components/bcmstoolbar.jsx'); // Our custom react component

	window.React = React;

	injectTapEventPlugin();

	React.render(<BCMSToolbar />, document.getElementById('bcms-toolbar'));

})();