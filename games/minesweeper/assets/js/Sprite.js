


	class Sprite {
		constructor (image, xImage, yImage, wImage, hImage) {
			this.image  = image;
			this.xImage = xImage;
			this.yImage = yImage;
			this.wImage = wImage;
			this.hImage = hImage;
		};

		toDraw (xCanvas, yCanvas, wCanvas, hCanvas) {
			this.canvasContext.drawImage(
				this.image, this.xImage, this.yImage, this.wImage, this.hImage, xCanvas, yCanvas, wCanvas, hCanvas
			);
		};
	};

