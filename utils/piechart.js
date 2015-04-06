var palette = require('./palette.js');

var pieChart = function(dom, props) {
	var width = dom.offsetWidth;
	var height =  width/1.46;
	var data = props.data;

	var color = d3.scale.ordinal()
		.range(palette.getSwatch(7));
	
	var arc = d3.svg.arc()
		.outerRadius(height/2 - 39)
		.innerRadius(height/2 - 200);
	
	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) { return d.count; });

	var svg = d3.select(dom).append("svg")
		.attr("width", width)
		.attr("height", height);

	var piechart = svg.append("g")
		.attr("id", "piechart")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	
	var g = piechart.selectAll(".arc")
		.data(pie(data))
		.enter().append("g")
		.attr("class", "arc");

	g.append("path")
		.attr("d", arc)
		.style("fill", function(d) { return color(d.data._id); })
		.attr("fill-opacity", 0);

	g.selectAll("path")	
		.transition()
		.duration(1000)
		.attr("fill-opacity", 1);

	g.append("text")
		.transition()
		.duration(1000)
		.attr("transform", function(d) { 
			var c = arc.centroid(d);
			return "translate(" + c[0]*1.3 +"," + c[1]*1.5 + ")"; 
		})
		.attr("dy", ".35em")
		.style("text-anchor", function(d,i) {
			if(i > data.length/2) return "end";
			else return "start";
		})
		.text(function(d) { return getAgenciesName(d.data._id); });


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

module.exports = pieChart;