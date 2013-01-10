# PixelZoom(source, factor)

So everyone who's working on 8-bit style games for the web is well aware of the scaling 
problem. Scale an image, get blurry, fuzzy awfulness. While there are rays of hope potentially 
on the horizon (`context.imageSmoothingEnabled`, `img.style.imageRendering`), support of these 
solutions are very sparse, and it doesn't look like that'll be changing too soon.

So the only way of resizing your hand-crafted pixelart in a way that doesn't destroy your hard 
work is to resize the image _before_ you use it. This is a pain to do (keeping track of 2 
versions of your images, etc.), but the other option is to resize these images at load-time.

PixelZoom helps you do this. Pass in the _source_ image or canvas element, along with a 
_factor_ to zoom it by, and it will return a new canvas element with the nicely rendered, 
crisp-edged, pixelly goodness.

If the browser doesn't support canvas, you're kind of one for, but PixelZoom will give you back 
a new image that has been resize dthe old, blurry way.
