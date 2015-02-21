/** In this file, we create a React component which incorporates components provided by material-ui */

var React = require('react'),
	mui = require('material-ui'),
	Container = mui.Paper;
	Toolbar = mui.Toolbar,
	ToolbarGroup = mui.ToolbarGroup,
	DateFrom = mui.DatePicker,
	DateTo = mui.DatePicker,
	PostButton = mui.RaisedButton,
	Mode = mui.DropDownMenu,
	menuItems = [
		{ payload: '1', text: '-- Pilih Mode Visualisasi --' },
		{ payload: '2', text: 'Berdasarkan Lokasi' },
		{ payload: '3', text: 'Berdasarkan Waktu' },
		{ payload: '4', text: 'Berdasarkan Frekuensi' }
	]; 

var BCMSToolbar = React.createClass({

	render: function() {

		return (
			<Container zDepth={1}>
				<Toolbar>
					<ToolbarGroup key={0} float="left">
						<div className="toolbar-parameter">
							<Mode menuItems={menuItems} />
							<DateFrom hintText='Dari Tanggal..' style={{width:150}}/>
							<DateTo hintText='Hingga Tanggal..' />
						</div>
					</ToolbarGroup>
					<ToolbarGroup key={1} float="right">
						<span className="mui-toolbar-separator">&nbsp;</span>
						<PostButton label="Tampilkan" onTouchTap={this._handleTouchTap} />
					</ToolbarGroup>
				</Toolbar>
			</Container>
		);
	},

	_handleTouchTap: function() {
		alert('1-2-3-4-5');
	}
	
});

module.exports = BCMSToolbar;