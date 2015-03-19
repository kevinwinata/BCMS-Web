var React = require('react'),
	Visualization = require('./visualization.jsx'),
	mui = require('material-ui'),
	Paper = mui.Paper,
	DatePicker = mui.DatePicker,
	FlatButton = mui.FlatButton,
	RaisedButton = mui.RaisedButton,
	DropDownMenu = mui.DropDownMenu,
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

var Toolbar = React.createClass({

	render: function() {
		return (
			<Paper zDepth={1}>
				<p>Mode Visualisasi : </p>
				<DropDownMenu menuItems={menuItems} onChange={this.modeChange}/>
				<p>Dari Tanggal :  </p>
				<DatePicker ref="dateFrom" defaultDate={today} formatDate={this.dformat}  />
				<p>Hingga Tanggal : </p>
				<DatePicker ref="dateTo" defaultDate={nextweek} formatDate={this.dformat} />
				<p>Dinas : </p>
				<Checkbox ref="check0" label="Transportasi" />
				<Checkbox ref="check1" label="Kesehatan" />
				<Checkbox ref="check2" label="Perhubungan" />
				<Checkbox ref="check3" label="Transportasi" />
				<Checkbox ref="check4" label="Kesehatan" />
				<Checkbox ref="check5" label="Perhubungan" />
				<Checkbox ref="check6" label="Transportasi" />
				<Checkbox ref="check7" label="Kesehatan" />
				<Checkbox ref="check8" label="Perhubungan" />
				<Checkbox ref="check9" label="Transportasi" />
				<p/>
				<div id="vis-button">
				<RaisedButton label="Visualisasi" secondary={true} onTouchTap={this.handleViz}/>
				</div>
				<p/>
			</Paper>
		);
	},

	modeChange: function(e, selectedIndex, menuItem) {
		selectedItems = selectedIndex;
	},

	dformat: function(date) {
		var d = date.getDate();
		var m;
		switch(date.getMonth()) {
			case 0 : m = "Jan"; break;
			case 1 : m = "Feb"; break;
			case 2 : m = "Mar"; break;
			case 3 : m = "Apr"; break;
			case 4 : m = "Mei"; break;
			case 5 : m = "Jun"; break;
			case 6 : m = "Jul"; break;
			case 7 : m = "Agu"; break;
			case 8 : m = "Sep"; break;
			case 9 : m = "Okt"; break;
			case 10 : m = "Nov"; break;
			case 11 : m = "Des"; break;
		}
		var y = date.getFullYear();
		return d + " " + m + " " + y;
	},

	checkboxesString: function() {
		var str = "";
		str += this.refs.check0.isChecked() ? "1" : "0";
		str += this.refs.check1.isChecked() ? "1" : "0";
		str += this.refs.check2.isChecked() ? "1" : "0";
		str += this.refs.check3.isChecked() ? "1" : "0";
		str += this.refs.check4.isChecked() ? "1" : "0";
		str += this.refs.check5.isChecked() ? "1" : "0";
		str += this.refs.check6.isChecked() ? "1" : "0";
		str += this.refs.check7.isChecked() ? "1" : "0";
		str += this.refs.check8.isChecked() ? "1" : "0";
		str += this.refs.check9.isChecked() ? "1" : "0";
		return str;
	},

	handleViz: function() {
		var df = Date.parse(this.refs.dateFrom.getDate());
		var dt = Date.parse(this.refs.dateTo.getDate());
		var dom = document.getElementById('visualization');
		var c = this.checkboxesString();

		switch(selectedItems) {
			case 0:
				$.get('/map', { datefrom: df, dateto: dt, agencies: c }, function(data) {
					React.render(<Visualization mode={0} data={data}/>, dom);
				});
				break;
			case 1:
				$.get('/stream', { datefrom: df, dateto: dt, agencies: c }, function(data) {
					React.render(<Visualization mode={1} data={data}/>, dom);
				});
				break;
			case 2:
				$.get('/word', { datefrom: df, dateto: dt, agencies: c }, function(data) {
					React.render(<Visualization mode={2} data={data}/>, dom);
				});
				break;
		}
	}
	
});

module.exports = Toolbar;