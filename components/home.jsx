var React = require('react'),
	mui = require('material-ui'),
	Paper = mui.Paper;

var Home = React.createClass({

	render: function() {
		return (
			<Paper zDepth={1}>
				<div id="home-text">
					<h3>Selamat datang di Bandung Complaint Management System!</h3>
					<p>Halaman web ini menyediakan visualisasi untuk keluhan yang masuk
					pada akun twitter dinas-dinas pemerintah kota Bandung.</p>
					<p>Akun-akun twitter pemerintah tersebut adalah : </p>
					<p>
						<a href="https://twitter.com/asdfghjkl">@asdfghjkl</a>, 
						<a href="https://twitter.com/asdfghjkl">@asdfghjkl</a>, 
						<a href="https://twitter.com/asdfghjkl">@asdfghjkl</a>, 
						<a href="https://twitter.com/asdfghjkl">@asdfghjkl</a>, 
						<a href="https://twitter.com/asdfghjkl">@asdfghjkl</a>, 
						<a href="https://twitter.com/asdfghjkl">@asdfghjkl</a>, 
						<a href="https://twitter.com/asdfghjkl">@asdfghjkl</a>, 
						<a href="https://twitter.com/asdfghjkl">@asdfghjkl</a>, 
						<a href="https://twitter.com/asdfghjkl">@asdfghjkl</a>, 
						<br/>
						<a href="https://twitter.com/asdfghjkl">@asdfghjkl</a>, 
						<a href="https://twitter.com/asdfghjkl">@asdfghjkl</a>, 
						<a href="https://twitter.com/asdfghjkl">@asdfghjkl</a>, 
						<a href="https://twitter.com/asdfghjkl">@asdfghjkl</a>, 
						<a href="https://twitter.com/asdfghjkl">@asdfghjkl</a>, 
						<a href="https://twitter.com/asdfghjkl">@asdfghjkl</a>, 
						<a href="https://twitter.com/asdfghjkl">@asdfghjkl</a>, 
						<a href="https://twitter.com/asdfghjkl">@asdfghjkl</a>
					</p>
					<p>Anda dapat memilih dari 3 mode visualisasi : </p>
					<ul id="mode-list">
						<li><b>Peta : </b><br/>Mode ini memperlihatkan daerah-daerah di kota Bandung
						dengan keluhan terbanyak.</li>
						<li><b>Arus : </b><br/>Mode ini memperlihatkan perkembangan topik keluhan.</li>
						<li><b>Kata : </b><br/>Mode ini memperlihatkan kata-kata yang paling banyak 
						disebut.</li>
						</ul><br/>
					<p>Anda juga dapat mengatur tanggal berapa dan dinas apa saja yang hendak 
					diikutsertakan dalam visualisasi.</p>
				</div>
			</Paper>

		);
	}
	
});

module.exports = Home;