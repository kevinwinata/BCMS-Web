var React = require('react'),
	mui = require('material-ui'),
	FlatButton = mui.FlatButton,
	Paper = mui.Paper,
	Dialog = mui.Dialog,
	standardActions = [
		{ text: 'Tutup' }
	];

var Navbar = React.createClass({

	render: function() {
		return (
			<Paper id="nav-paper" rounded={false} zDepth={1}>
				<ul className="nav-site">
					<div className="item-left">
						<FlatButton label="Tentang kami" onTouchTap={this.openAbout} />
					</div>
					<div className="item-left">
						<FlatButton label="FAQ" onTouchTap={this.openFAQ} />
					</div>
					<div className="item-logo">
					</div>
					<div className="item-right">
						<FlatButton label="Github" linkButton={true} 
							href="https://github.com/kevinwinata/BCMS-Web" />
					</div>
					<div className="item-right">
						<FlatButton label="Kontak" onTouchTap={this.openContact} />
					</div>
				</ul>
				<Dialog title="FAQ" ref="faqDialog" actions={standardActions}>
					<b> Q: Lorem ipsum dolor sit amet, et percipit petentium vis. </b><br/>
					A: Inani habemus mea in. <br/>
					<b> Q: Nonumes convenire at nam, vix ea consul dolorem. </b><br/>
					A: An ullum voluptatum inciderint eos, no doming feugait persecuti per. <br/>
					<b> Q: Vix aeque luptatum tincidunt et, rebum melius latine ea sit. </b><br/>
					A: Qui ea offendit persecuti, sale albucius vis et, virtute imperdiet id sit. <br/>
					<b> Q: Per ad omnium scaevola complectitur, salutandi conclusionemque no cum. </b><br/>
					A: Vivendo probatus eu est, quo ne option labitur utroque.
				</Dialog>

				<Dialog title="Tentang Kami" ref="aboutDialog" actions={standardActions}>
					Lorem ipsum dolor sit amet, et percipit petentium vis. <br/>
					Inani habemus mea in. <br/>
					Nonumes convenire at nam, vix ea consul dolorem. <br/>
					An ullum voluptatum inciderint eos, no doming feugait persecuti per. <br/>
					Vix aeque luptatum tincidunt et, rebum melius latine ea sit. <br/>
					Qui ea offendit persecuti, sale albucius vis et, virtute imperdiet id sit.
				</Dialog>

				<Dialog title="Kontak" ref="contactDialog" actions={standardActions}>
					Email : asdf@gmail.com <br/>
					No. Telepon : +62-22-123456
				</Dialog>
			</Paper>

		);
	},

	openAbout: function() {
		this.refs.aboutDialog.show();
	},

	openFAQ: function() {
		this.refs.faqDialog.show();
	},

	openContact: function() {
		this.refs.contactDialog.show();
	}
	
});

module.exports = Navbar;