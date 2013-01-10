window.PixelZoom = function PixelZoom(source, factor) {
	var zoomed_size = {
		width: Math.floor(source.width * factor),
		height: Math.floor(source.height * factor)
	};

	// create canvas to use for rendering
	var canvas = document.createElement("CANVAS");
	var context = canvas.context = canvas.getContext && canvas.getContext("2d");

	// no 2d canvas support...
	if (!context) {
		// ...so return zoomed image
		var zoomed = source.cloneNode(true);
		zoomed.width = zoomed_size.width;
		zoomed.height = zoomed_size.height;
		return zoomed;
	}

	// set canvas to zoomed size
	canvas.width = zoomed_size.width;
	canvas.height = zoomed_size.height;

	// loop through each pixel
	var x = 0, xl = source.width,
		y = 0, yl = source.height;
	while (x < xl) {
		y = 0;
		while (y < yl) {
			// draw the pixel, zoomed in, to the canvas
			context.drawImage(source, x, y, 1, 1, x * factor, y * factor, factor, factor);
			y++;
		}
		x++;
	}


	return canvas;





	var temp = document.createElement("CANVAS");
	temp.width = Math.floor(source.width * factor);
	temp.height = Math.floor(source.height * factor);

	var context = temp.getContext("2d");
	context.drawImage(source, 0, 0);

	var src = context.getImageData(0, 0, source.width, source.height),
		sp = 0, sd = src.data, sw = source.width, sh = source.height,
		sx, sy,
		sr, sg, sb, sa;
	var dest = context.createImageData(temp.width, temp.height),
		dp = 0, dd = dest.data, dw = dest.width,
		dny = (dw - factor) * 4, dnyu = -dny, dnx = (factor - (dw * factor)) * 4,
		dx, dy;

	for (sy = 0; sy < sh; sy++) {
		for (sx = 0; sx < sw; sx++) {
			sr = sd[sp++];
			sg = sd[sp++];
			sb = sd[sp++];
			sa = sd[sp++];

			for (dy = 0; dy < factor; dy++, dp += dny) {
				for (dx = 0; dx < factor; dx++) {
					dd[dp++] = sr;
					dd[dp++] = sg;
					dd[dp++] = sb;
					dd[dp++] = sa;
				}
			}

			dp += (sx != sw - 1) ? dnx : -dny;
		}
	}

	context.clearRect(0, 0, sw, sh);
	context.putImageData(dest, 0, 0);

	return temp;
};
