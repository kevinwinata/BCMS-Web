/** In this file, we create a React component which incorporates components provided by material-ui */

var React = require('react'),
	mui = require('material-ui'),
	Container = mui.Paper,
	DateFrom = mui.DatePicker,
	DateTo = mui.DatePicker,
	NormalButton = mui.RaisedButton,
	PostButton = mui.RaisedButton,
	Mode = mui.DropDownMenu,
	Menu = mui.Menu,
	menuItems = [
		{ payload: '1', text: 'Peta' },
		{ payload: '2', text: 'Arus' },
		{ payload: '3', text: 'Kata' }
	],
	today = new Date(),
	nextweek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

var BCMSToolbar = React.createClass({

	render: function() {
		var center = {
			marginLeft:'auto',
			marginRight:'auto'
		}
		return (
			<Container zDepth={1}>
				<p>Mode Visualisasi : </p>
				<Mode menuItems={menuItems} style={center}/>
				<p>Dari Tanggal :  </p>
				<DateFrom defaultDate={today} formatDate={this.dformat} style={center}/>
				<p>Hingga Tanggal : </p>
				<DateTo defaultDate={nextweek} formatDate={this.dformat} style={center}/>
				<p>Dinas : </p>
				<NormalButton label="Pilih" id="button-dinas" style={center}/>
				<p/>
				<PostButton label="Visualisasi" secondary={true} id="button-post" style={center}/>
				<p/>
			</Container>
		);
	},

	dformat: function(date) {
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		return d + '/' + m + '/' + y;
	}
	
});

module.exports = BCMSToolbar;