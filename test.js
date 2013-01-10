// console shim
if (!window.console) { window.console = {}; }
if (!console.log) { console.log = function (messages) { }; }
if (!console.group) { console.group = function (name) { console.log(name + "_____vv"); } }
if (!console.groupEnd) { console.groupEnd = function () { console.log("^^-----") }; }

var sample = document.getElementById("sample");
var factor = 4;

var ZoomExample = (function () {
	function ZoomExample(src) {
		var sample = new Image();
		sample.onload = sample_load;
		sample.container = document.body.appendChild(document.createElement("DIV"));

		sample.src = src;
		return sample.container;
	};

	function sample_load() {
		this.container.appendChild(this).title = "original";

		var start = new Date(), ms;
		this.container.appendChild(PixelZoom(this, factor)).title = "PixelZoomed";
		ms = new Date() - start;

		console.group(this.src + " (" + this.width + "x" + this.height + ")");
		console.log("rendering (ms): ", ms);
		console.log("average time per pixel (ms): ", (ms / (this.width * this.height)));
		console.groupEnd();

		var stretched = this.cloneNode();
		stretched.width = this.width * factor;
		stretched.height = this.height * factor;

		this.container.appendChild(stretched).title = "stretched";
	}

	return ZoomExample;
})();

ZoomExample("finn_and_jake_pixel_art_by_iru_mizu-d52xa9n.gif");
ZoomExample("Thank_You_for_1000_Watchers_by_ValaSedai-d4p02io.gif");
