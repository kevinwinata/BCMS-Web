/** In this file, we create a React component which incorporates components provided by material-ui */

var React = require('react'),
	Visualization = require('./visualization.jsx'),
	mui = require('material-ui'),
	Container = mui.Paper,
	DatePicker = mui.DatePicker,
	FlatButton = mui.FlatButton,
	PostButton = mui.RaisedButton,
	Mode = mui.DropDownMenu,
	Menu = mui.Menu,
	Checkbox = mui.Checkbox,
	Dialog = mui.Dialog,
	menuItems = [
		{ payload: '1', text: 'Peta' },
		{ payload: '2', text: 'Arus' },
		{ payload: '3', text: 'Kata' }
	],
	selectedItems = 0,
	today = new Date(),
	nextweek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

var BCMSToolbar = React.createClass({

	render: function() {
		return (
			<Container zDepth={1}>
				<p>Mode Visualisasi : </p>
				<Mode menuItems={menuItems} onChange={this.modeChange}/>
				<p>Dari Tanggal :  </p>
				<DatePicker ref="dateFrom" defaultDate={today} formatDate={this.dformat}  />
				<p>Hingga Tanggal : </p>
				<DatePicker ref="dateTo" defaultDate={nextweek} formatDate={this.dformat} />
				<p>Dinas : </p>
				<Checkbox value="check0" label="Transportasi" />
				<Checkbox value="check1" label="Kesehatan" />
				<Checkbox value="check2" label="Perhubungan" />
				<Checkbox value="check3" label="Transportasi" />
				<Checkbox value="check4" label="Kesehatan" />
				<Checkbox value="check5" label="Perhubungan" />
				<Checkbox value="check6" label="Transportasi" />
				<Checkbox value="check7" label="Kesehatan" />
				<Checkbox value="check8" label="Perhubungan" />
				<Checkbox value="check9" label="Transportasi" />
				<p/>
				<PostButton label="Visualisasi" secondary={true} id="button-post" onTouchTap={this.handleViz}/>
				<p/>
			</Container>
		);
	},

	modeChange: function(e, selectedIndex, menuItem) {
		selectedItems = selectedIndex;
	},

	dformat: function(date) {
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		return d + '/' + m + '/' + y;
	},

	handleViz: function() {
		var df = Date.parse(this.refs.dateFrom.getDate());
		var dt = Date.parse(this.refs.dateTo.getDate());

		if (selectedItems == 0) {
			$.get('/map', { datefrom: df, dateto: dt }, function(data) {
				React.render(<Visualization mode={0} data={data}/>, 
					document.getElementById('bcms-visualization'));
			});
		}
		else if (selectedItems == 1) {
			$.get('/stream', { datefrom: df, dateto: dt }, function(data) {
				React.render(<Visualization mode={1} data={data}/>, 
					document.getElementById('bcms-visualization'));
			});
		}
		else if (selectedItems == 2) {
			$.get('/word', { datefrom: df, dateto: dt }, function(data) {
				React.render(<Visualization mode={2} data={data}/>, 
					document.getElementById('bcms-visualization'));
			});
		}
	}
	
});

module.exports = BCMSToolbar;