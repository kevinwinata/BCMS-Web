var palette = require('./palette.js');

var agenciesChart = function(dom, props) {
	var width = dom.offsetWidth;
	var height = width/1.46;
	var data = props.data;

	var color = d3.scale.category20c();

	var treemap = d3.layout.treemap()
			.size([width, height])
			.sticky(true)
			.value(function(d) { return d.count; });

	var div = d3.select("dom").append("div")
			.style("position", "relative")
			.style("width", width + "px")
			.style("height", height + "px");

	var node = div.datum(data).selectAll(".node")
			.data(treemap.nodes)
			.enter().append("div")
			.attr("class", "node")
			.call(position)
			.style("background", function(d) { return d.topics ? color(d.topic) : null; })
			.text(function(d) { return d.topics ? null : d.topic; });

	function position() {
		this.style("left", function(d) { return d.x + "px"; })
			.style("top", function(d) { return d.y + "px"; })
			.style("width", function(d) { return Math.max(0, d.dx-1) + "px"; })
			.style("height", function(d) { return Math.max(0, d.dy-1) + "px"; });
	}

	function getAgenciesName(i) {
		switch(i) {
			case 0: return "Badan Kepegawaian Daerah";
			case 1: return "Badan Pengelolaan Lingkungan Hidup";
			case 2: return "Dinas Bina Marga dan Pengairan";
			case 3: return "Dinas Kebakaran";
			case 4: return "Dinas Kebudayaan dan Pariwisata";
			case 5: return "Dinas Kesehatan";
			case 6: return "Dinas Komunikasi dan Informatika";
			case 7: return "Dinas Pelayanan Pajak";
			case 8: return "Dinas Pemakaman dan Pertamanan";
			case 9: return "Dinas Pendidikan";
			case 10: return "Dinas Perhubungan";
			case 11: return "Dinas Sosial";
			case 12: return "Dinas Tata Ruang dan Cipta Karya";
			case 13: return "PDAM Tirtawening";
			case 14: return "PD Kebersihan";
			case 15: return "PD Pasar Bermartabat";
			case 16: return "Satpol PP";
		}
	}
}

module.exports = agenciesChart;