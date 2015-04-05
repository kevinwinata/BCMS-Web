var React = require('react'),
	mui = require('material-ui'),
	Paper = mui.Paper;

var Home = React.createClass({

	render: function() {
		return (
			<Paper zDepth={1}>
				<div id="home-text">
					<h3>Selamat datang di layanan visualisasi BCMS!</h3>
					<p>Layanan ini menyediakan visualisasi untuk keluhan yang masuk
					pada akun twitter dinas-dinas pemerintah kota Bandung.</p>
					<p>Akun-akun twitter pemerintah tersebut adalah : </p>
					<p>
						<a href="https://twitter.com/bkdkotabandung">@bkdkotabandung</a>, 
						<a href="https://twitter.com/bplh_kotabdg">@bplh_kotabdg</a>, 
						<a href="https://twitter.com/disbudpar_bdg">@disbudpar_bdg</a>, 
						<a href="https://twitter.com/dbmpkotabdg">@dbmpkotabdg</a>, 
						<a href="https://twitter.com/rescue_damkar">@rescue_damkar</a>, 
						<a href="https://twitter.com/bandung_dinkes">@bandung_dinkes</a>, 
						<a href="https://twitter.com/diskominfobdg">@diskominfobdg</a>, 
						<a href="https://twitter.com/disyanjakkotbdg">@disyanjakkotbdg</a>, 
						<a href="https://twitter.com/diskamtam">@diskamtam</a>, 
						<br/>
						<a href="https://twitter.com/disdik_bandung">@disdik_bandung</a>, 
						<a href="https://twitter.com/dishub_kotabdg">@dishub_kotabdg</a>, 
						<a href="https://twitter.com/Dinsos_BDG">@Dinsos_BDG</a>, 
						<a href="https://twitter.com/distarcipBDG">@distarcipBDG</a>, 
						<a href="https://twitter.com/pdamtirtawening">@pdamtirtawening</a>, 
						<a href="https://twitter.com/PDKEBERSIHAN">@PDKEBERSIHAN</a>, 
						<a href="https://twitter.com/PD_PB_Bandung">@PD_PB_Bandung</a>, 
						<a href="https://twitter.com/Satpolppbdg">@Satpolppbdg</a>, 
						<a href="https://twitter.com/ridwankamil">@ridwankamil</a>
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