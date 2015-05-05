var palette = require('./palette.js'),
	TweetListReq = require('./tweetlistreq.jsx');

var agenciesChart = function(dom, props) {
	var width = dom.offsetWidth;
	var height = width/1.46;
	var data = props.data;
    var radius = Math.min(width, height) / 2;
    var x = d3.scale.linear().range([0, 2 * Math.PI]);
    var y = d3.scale.linear().range([0, radius]);

	var partition = d3.layout.partition()
			.value(function(d) { return d.count; });

	var root = { _id: -1, children : data };

	var svg = d3.select(dom).append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

	var arc = d3.svg.arc()
		.startAngle(function(d) {
			return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
		})
		.endAngle(function(d) {
			return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
		})
		.innerRadius(function(d) {
			return Math.max(0, y(d.y));
		})
		.outerRadius(function(d) {
			return Math.max(0, y(d.y + d.dy));
		});

	var tooltip = d3.select(dom)
		.append("div")
		.attr("class", "tooltip")
		.style("position", "absolute")
		.style("z-index", "10")
		.style("opacity", 0);

	var path = svg.selectAll("path")
		.data(partition.nodes(root))
		.enter().append("path")
		.attr("d", arc)
		.style("fill", function(d,i) {
			return palette.getRandomMid(i);
		})
		.on("click", click)
		.on("mouseover", function(d) {
			tooltip.html(function() {
				if(d.children)
					return '<b>' + getAgenciesName(d._id) + '</b><br>' + 
						(d._id!=-1 ? '(' + d.total + ')' : '');
				else 
					return '<b>' + d.topic + '</b><br> (' + d.count + ')';
			});
			return tooltip.transition()
				.duration(50)
				.style("opacity", 0.9);
		})
		.on("mousemove", function(d) {
			return tooltip
				.style("top", (d3.event.pageY - 10) + "px")
				.style("left", (d3.event.pageX + 10) + "px");
		})
		.on("mouseout", function() {
			return tooltip.style("opacity", 0);
		})
		.on("dblclick", function(d) {
			if(d.children) {
				if(d._id > -1) {
					var agencies = "";
					for(var i = 0; i < 17; i++) agencies += (d._id==i) ? '1':'0';
					TweetListReq(dom, props.from, props.to, agencies);
				}
			}
			else {
				TweetListReq(dom, props.from, props.to, props.agencies, d.topic);
			}
		});

	function click(d) {
		path.transition()
			.duration(750)
			.attrTween("d", arcTween(d));
	}

	function getAgenciesName(i) {
		switch(i) {
			case -1: return "Daftar Dinas";
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

	d3.select(self.frameElement).style("height", height + "px");

	// Interpolate the scales!
	function arcTween(d) {
		var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
			yd = d3.interpolate(y.domain(), [d.y, 1]),
			yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
		return function(d, i) {
			return i ? function(t) {
				return arc(d);
			} : function(t) {
				x.domain(xd(t));
				y.domain(yd(t)).range(yr(t));
				return arc(d);
			};
		};
	}
}

module.exports = agenciesChart;