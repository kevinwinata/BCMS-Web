var React = require('react'),
	mui = require('material-ui'),
	FlatButton = mui.FlatButton,
	Paper = mui.Paper,
	IconButton = mui.IconButton,
	SvgIcon = mui.SvgIcon,
	CircleLogo = React.createClass({
		render: function() {
			return (
				<SvgIcon {...this.props}>
					<circle fill="none" stroke="#FFFFFF" stroke-width="3" stroke-miterlimit="10" cx="62.826" cy="62.053" r="62.5"/>
				</SvgIcon>
			);
		}
	});

var Navbar = React.createClass({

	render: function() {
		return (
			<Paper id="nav-paper" rounded={false} zDepth={1}>
				<ul className="nav-site">
					<div className="item-left">
						<FlatButton label="FAQ" linkButton={true} href="/" />
					</div>
					<div className="item-left">
						<FlatButton label="About" linkButton={true} href="/" />
					</div>
					<div className="item-logo">
					</div>
					<div className="item-right">
						<FlatButton label="Contact" linkButton={true} href="/" />
					</div>
					<div className="item-right">
						<FlatButton label="Github" linkButton={true} href="/" />
					</div>
				</ul>
			</Paper>
		);
	}
	
});

module.exports = Navbar;