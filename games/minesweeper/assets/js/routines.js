(function () {

	var canvas, ctx, tileSize = 30, qnt_bombas = 40, tabuleiro;

	var url_image = 'assets/img/minesweeper_graphs.png', content = document.getElementById('mineSweeper');

	var graphs = {};

	const resetButton = document.getElementById('resetGame');


	function createCanvas (w, h) {
		canvas = document.createElement('canvas');
		canvas.width  = w;
		canvas.height = h;
		canvas.textContent = 'sem suporte';

		content.appendChild(canvas);

		Sprite.prototype.canvasContext = ctx = canvas.getContext('2d');

		createSprites();

		tabuleiro = preencher_tabuleiro(16, 16);

		resetButton.addEventListener('click', _ => {
			tabuleiro = preencher_tabuleiro(16, 16);
		});

		canvas.addEventListener('click', onClickGame, false);
		canvas.addEventListener('dblclick', onDoubleClick, false);
		canvas.addEventListener('contextmenu', onRightClickGame, false);

		update();
	}



	function random (min = 0, max) {
		const args_len = arguments.length;

		return args_len < 2
			? Math.floor(Math.random() * min)
			: Math.floor(Math.random() * (max - min + 1) + min);
	}



	function createSprites () {
		graphs.covered   = new Sprite(image, 0, 0, 24, 24);
		graphs.emptyCell = new Sprite(image, 24, 0, 24, 24);
		graphs.bombFlag  = new Sprite(image, 48, 0, 24, 24);
		graphs.noBomb    = new Sprite(image, 72, 0, 24, 24);
		graphs.suspect   = new Sprite(image, 96, 0, 24, 24);
		graphs.hasBomb   = new Sprite(image, 120, 0, 24, 24);
		graphs.detonated = new Sprite(image, 144, 0, 24, 24);

		graphs.numbers = {};

		for (var n = 1, total = 8, starting = 168; n <= total; n++, starting += 24) {
			graphs.numbers['number' + n] = new Sprite(image, starting, 0, 24, 24);
		};
	}


	function preencher_tabuleiro (w, h) {
		const matrix = Array.from({ length: h }, (col, y) => {
			return Array.from({ length: w }, (row, x) => {
				return new Celula(x, y, tileSize);
			});
		});

		return lancar_bombas(matrix);
	}


	
	function freeOptions (matriz) {
		var options = [];

		for (var i = 0, lenI = matriz.length; i < lenI; i++) {
			for (var j = 0, lenJ = matriz[i].length; j < lenJ; j++) {
				if (matriz[i][j].neighborsCount !== -1) {
					options.push([i, j]);
				}
			}
		}

		return options;
	}



	function lancar_bombas (matriz) {
		var options = freeOptions(matriz);

		while (qnt_bombas > quantidade_bombas(matriz)) {
			var index = random(options.length), choice = options.splice(index, 1)[0];

			var celula = matriz[choice[0]][choice[1]];

			if (celula.neighborsCount === 0) {
				celula.neighborsCount = -1;
				celula.detonated = false;
			}
		}

		return lancar_indicadores(matriz);
	}


	function lancar_indicadores (matriz) {
		matriz.forEach((row, y) => {
			row.forEach((celula, x) => {
				if (celula.neighborsCount === -1) return;
				for (var i = -1, indicador = 0; i <= 1; i++) {
					if (!matriz[y + i]) continue;
					for (var j = -1; j <= 1; j++) {
						var celula_vizinha = matriz[y + i][x + j];
						if (!celula_vizinha || !i && !j) continue;
						if (celula_vizinha.neighborsCount === -1) {
							indicador++;
						}
					}
				}

				celula.neighborsCount = indicador;
			});
		});

		return matriz;
	}



	function quantidade_bombas (matriz) {		
		return matriz.reduce((acc, cur) => acc + cur.filter(cell => cell.neighborsCount < 0).length, 0);
	}


	function clearCanvas (newColor = '#fff') {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawRect(0, 0, canvas.width, canvas.height, newColor);
	}


	function drawRect (x, y, w, h, color) {
		ctx.fillStyle = color;
		ctx.fillRect(x + 1, y + 1, w - 2, h - 2);
	}


	function draw () {
		clearCanvas();

		tabuleiro.forEach(row => {
			row.forEach(cell => cell.draw(graphs, tileSize));
		});
	}


	function virgin () {
		return !tabuleiro.some(row => row.some(celula => !celula.covered));
	}

	function clearIsUncovered () {
		const coveredCells = tabuleiro.length * tabuleiro[0].length;

		const currentDiscovered = tabuleiro.reduce((acc, cur) => acc + cur.filter(celula => celula.neighborsCount !== -1 && !celula.covered).length, 0);

		return coveredCells - qnt_bombas === currentDiscovered;
	}


	function noOneIsDetonated () {
		return !tabuleiro.some(row => row.some(celula => celula.detonated));
	}


	function selectedElement (posX, posY) {
		for (var y = 0, lenY = tabuleiro.length; y < lenY; y++) {
			if (!(posY >= y * tileSize && posY <= y * tileSize + tileSize)) continue;
			for (var x = 0, lenX = tabuleiro[y].length; x < lenX; x++) {
				if (posX >= x * tileSize && posX <= x * tileSize + tileSize) {
					return tabuleiro[y][x];
				}
			}
		}
	}



	function virginGame (_el, x, y) {
		while (_el.neighborsCount === -1 && virgin()) {
			tabuleiro = preencher_tabuleiro(16, 16);

			_el = selectedElement(x, y);
		}

		return _el;
	}



	function tagBombsCovered (matriz, el) {
		matriz.forEach(row => {
			row.forEach(celula => {
				if (celula.neighborsCount === -1 && celula.flag) return;
				if (celula.neighborsCount === -1 && !celula.flag) {
					celula.covered = false;
					celula.detonated = (celula === el); // celula atual foi a detonada
				}
				if (celula.neighborsCount >= 0 && celula.flag) {
					celula.covered = false;
				}
			});
		});
	}



	function checkVictory () {
		if (clearIsUncovered()) {
			setTimeout(function () {
				alert('venceu');
			}, 100);
		}
	}



	function onClickGame (event) {
		event.preventDefault();
		var mouseX = (event.pageX || event.clientX) - content.offsetLeft;
		var mouseY = (event.pageY || event.clientY) - content.offsetTop;

		var _el = virginGame(selectedElement(mouseX, mouseY), mouseX, mouseY);

		if (_el.covered && !_el.flag && !_el.suspect && noOneIsDetonated() && !clearIsUncovered()) {
			if (_el.neighborsCount === -1) {
				return tagBombsCovered(tabuleiro, _el);
			}

			_el.revealIt(tabuleiro);

			checkVictory();
		}
	}



	function onDoubleClick (event) {
		event.preventDefault();
		var mouseX = (event.clientX || event.pageX) - content.offsetLeft;
		var mouseY = (event.clientY || event.pageY) - content.offsetTop;

		var _el = selectedElement(mouseX, mouseY);

		if (!_el.covered && !_el.flag && !_el.suspect && noOneIsDetonated() && !clearIsUncovered()) {
			for (var y = -1, howMany = 0; y <= 1; y++) {
				if (!tabuleiro[_el.y + y]) continue;
				for (var x = -1; x <= 1; x++) {
					var celula_vizinha = tabuleiro[_el.y + y][_el.x + x];
					if (!celula_vizinha || !y && !x) continue;
					if (celula_vizinha.flag === 'bombFlag') howMany++;
				}
			}

			if (howMany === _el.neighborsCount) {
				clearAround(_el, tabuleiro);
				
				checkVictory();
			}

		}
	}



	function clearAround (el, matriz) {
		for (var i = -1; i <= 1; i++) {
			if (!matriz[el.y + i]) continue;
			for (var j = -1; j <= 1; j++) {
				var vizinha = matriz[el.y + i][el.x + j];
				if (!vizinha || vizinha.flag === 'bombFlag') continue;
				if (vizinha.neighborsCount === -1) {
					return tagBombsCovered(matriz, vizinha);
				}

				vizinha.revealIt(matriz);
			}
		}
	}



	function onRightClickGame (event) {
		event.preventDefault();
		var mouseX = (event.clientX || event.pageX) - content.offsetLeft;
		var mouseY = (event.clientY || event.pageY) - content.offsetTop;

		var _el = selectedElement(mouseX, mouseY);

		if (_el.covered && noOneIsDetonated() && !clearIsUncovered()) {
			_el.flag = !_el.flag ? 'bombFlag' : (_el.flag === 'bombFlag') ? 'suspect' : null;
		}
	}


	function update (time = 0) {
		draw();

		requestAnimationFrame(update, canvas);
	}



	var image = new Image();
	image.src = url_image;
	image.onload = function () {
		// createSprites();
		createCanvas(480, 480);
	}
} ());
