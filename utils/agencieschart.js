var palette = require('./palette.js');

var agenciesChart = function(dom, props) {
	var width = dom.offsetWidth;
	var height = width/1.46;
	var data = props.data;
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([0, height]);

	var partition = d3.layout.partition()
			//.size([width, height])
			// .padding([10,0,0,0])
			// .round(true)
			// .sticky(true)
			.value(function(d) { return d.count; });

	var vis = d3.select(dom).append("div")
			.attr("class", "chart")
			.style("position", "relative")
			.style("width", width + "px")
			.style("height", height + "px")
			.append("svg:svg")
			.attr("width", width)
			.attr("height", height);

	var root = { children : data };

	var g = vis.selectAll("g")
		.data(partition.nodes(root))
		.enter().append("svg:g")
		.attr("transform", function(d) { return "translate(" + x(d.y) + "," + y(d.x) + ")"; })
		.on("click", click);

	var kx = width / root.dx,
	ky = height / 1;

	g.append("svg:rect")
		.attr("width", root.dy * kx)
		.attr("height", function(d) { return d.dx * ky; })
		.attr("fill", function(d,i) { return d.children ? palette.getRandomMid(i) : palette.getRandomFromSwatch(i); })
		.attr("class", function(d) { return d.children ? "parent" : "child"; });

	g.append("svg:text")
		.attr("transform", transform)
		.attr("dy", ".35em")
		.style("opacity", function(d) { return d.dx * ky > 12 ? 1 : 0; })
		.text(function(d) { return d.children ? getAgenciesName(d._id) : d.topic; })

	d3.select(window)
		.on("click", function() { click(root); })

	function click(d) {
		if (!d.children) return;

		kx = (d.y ? width - 40 : width) / (1 - d.y);
		ky = height / d.dx;
		x.domain([d.y, 1]).range([d.y ? 40 : 0, width]);
		y.domain([d.x, d.x + d.dx]);

		var t = g.transition()
		.duration(d3.event.altKey ? 7500 : 750)
		.attr("transform", function(d) { return "translate(" + x(d.y) + "," + y(d.x) + ")"; });

		t.select("rect")
		.attr("width", d.dy * kx)
		.attr("height", function(d) { return d.dx * ky; });

		t.select("text")
		.attr("transform", transform)
		.style("opacity", function(d) { return d.dx * ky > 12 ? 1 : 0; });

		d3.event.stopPropagation();
	}

	function transform(d) {
		return "translate(8," + d.dx * ky / 2 + ")";
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