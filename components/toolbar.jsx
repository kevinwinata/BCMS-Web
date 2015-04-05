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
		{ payload: '0', text: 'Dinas' },
		{ payload: '1', text: 'Peta' },
		{ payload: '2', text: 'Arus' },
		{ payload: '3', text: 'Kata' }
	],
	selectedItems = 0,
	today = new Date(),
	prevweek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

var Toolbar = React.createClass({

	render: function() {
		return (
			<Paper zDepth={1}>
				<p>Mode Visualisasi : </p>
				<DropDownMenu menuItems={menuItems} onChange={this.modeChange}/>
				<p>Dari Tanggal :  </p>
				<DatePicker ref="dateFrom" defaultDate={prevweek} formatDate={this.dformat} mode="landscape" />
				<p>Hingga Tanggal : </p>
				<DatePicker ref="dateTo" defaultDate={today} formatDate={this.dformat} mode="landscape" />
				<p>Dinas : </p>
				<div className="tool-button">
				<FlatButton label="Pilih Dinas" onTouchTap={this.openCheckDialog}/>
				</div>
				<Dialog ref="checkDialog" title="Pilih Dinas" actions={[
					<section>
					<div id="check1col">
					<Checkbox ref="check0" defaultSwitched={true} label="Badan Kepegawaian Daerah" />
					<Checkbox ref="check1" defaultSwitched={true} label="Badan Pengelolaan Lingkungan Hidup" />
					<Checkbox ref="check2" defaultSwitched={true} label="Dinas Bina Marga dan Pengairan" />
					<Checkbox ref="check3" defaultSwitched={true} label="Dinas Kebakaran" />
					<Checkbox ref="check4" defaultSwitched={true} label="Dinas Kebudayaan dan Pariwisata" />
					<Checkbox ref="check5" defaultSwitched={true} label="Dinas Kesehatan" />
					<Checkbox ref="check6" defaultSwitched={true} label="Dinas Komunikasi dan Informatika" />
					<Checkbox ref="check7" defaultSwitched={true} label="Dinas Pelayanan Pajak" />
					<Checkbox ref="check8" defaultSwitched={true} label="Dinas Pemakaman dan Pertamanan" />
					</div>
					<div id="check2col">
					<Checkbox ref="check9" defaultSwitched={true} label="Dinas Pendidikan" />
					<Checkbox ref="check10" defaultSwitched={true} label="Dinas Perhubungan" />
					<Checkbox ref="check11" defaultSwitched={true} label="Dinas Sosial" />
					<Checkbox ref="check12" defaultSwitched={true} label="Dinas Tata Ruang dan Cipta Karya" />
					<Checkbox ref="check13" defaultSwitched={true} label="PDAM Tirtawening" />
					<Checkbox ref="check14" defaultSwitched={true} label="PD Kebersihan" />
					<Checkbox ref="check15" defaultSwitched={true} label="PD Pasar Bermartabat" />
					<Checkbox ref="check16" defaultSwitched={true} label="Satpol PP" />
					<br></br>
					</div>
					</section>,
					<FlatButton
						label="Tutup"
						secondary={true}
						onTouchTap={this.closeCheckDialog} />
					]}>
					Dinas yang tidak tercentang tak akan diikutsertakan dalam visualisasi.
				</Dialog>
				<p/><p/>
				<div className="tool-button">
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
		for (var i = 0; i < 17; i++) {
			str += this.refs["check"+i].isChecked() ? "1" : "0";
		}
		return str;
	},

	handleViz: function() {
		var df = Date.parse(this.refs.dateFrom.getDate());
		var dt = Date.parse(this.refs.dateTo.getDate());
		var dom = document.getElementById('visualization');
		var c = this.checkboxesString();

		switch(selectedItems) {
			case 0:
				$.get('/agencies', { datefrom: df, dateto: dt, agencies: c }, function(data) {
					React.render(<Visualization mode={0} data={data}/>, dom);
				});
				break;
			case 1:
				$.get('/map', { datefrom: df, dateto: dt, agencies: c }, function(data) {
					React.render(<Visualization mode={1} data={data}/>, dom);
				});
				break;
			case 2:
				$.get('/stream', { datefrom: df, dateto: dt, agencies: c }, function(data) {
					React.render(<Visualization mode={2} data={data}/>, dom);
				});
				break;
			case 3:
				$.get('/word', { datefrom: df, dateto: dt, agencies: c }, function(data) {
					React.render(<Visualization mode={3} data={data}/>, dom);
				});
				break;
		}
	},

	openCheckDialog: function() {
		this.refs.checkDialog.show();
	},

	closeCheckDialog: function() {
		this.refs.checkDialog.dismiss();
	}
	
});

module.exports = Toolbar;