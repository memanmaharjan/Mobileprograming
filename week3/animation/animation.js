$(function () {
	const $box = $('#animateBox');
	const $container = $box.parent(); 
	const $btn = $('#startAnimationBtn');
	let isAnimating = false;

	function computeCenter(width, height) {
		const containerW = $container.width();
		const containerH = $container.height();
		const boxW = typeof width === 'number' ? width : $box.outerWidth();
		const boxH = typeof height === 'number' ? height : $box.outerHeight();
		return { left: Math.round((containerW - boxW) / 2), top: Math.round((containerH - boxH) / 2) };
	}

	
	$box.css('position', 'absolute');
	let origPos = computeCenter();
	$box.css({ left: origPos.left, top: origPos.top });

		const origStyles = {
		fontSize: $box.css('font-size'),
		color: $box.css('color'),
		background: $box.css('background-color'),
		width: $box.width(),
		height: $box.height(),
		borderRadius: parseInt($box.css('border-radius'), 10) || 0,
	};

	function createSteps() {
		const containerW = $container.width();
		const containerH = $container.height();

		const s1 = { width: 260, height: 120, borderRadius: 24, fontSize: '24px', color: '#ffffff', background: '#e74c3c', corner: 'tl' };
		const s2 = { width: 180, height: 80, borderRadius: 6, fontSize: '18px', color: '#000000', background: '#f1c40f', corner: 'tr' };
		const sBig = { width: 420, height: 120, borderRadius: 12, fontSize: '26px', color: '#ffffff', background: '#e67e22', corner: 'center' };
		const s3 = { width: 300, height: 140, borderRadius: 40, fontSize: '30px', color: '#000000', background: '#2ecc71', corner: 'bl' };
		const s4 = { width: 200, height: 100, borderRadius: 50, fontSize: '20px', color: '#ffffff', background: '#9b59b6', corner: 'br' };

		const arr = [s1, s2, sBig, s3, s4];

		return arr.map((s) => {
			let left = 20;
			let top = 20;

			if (s.corner === 'tr') left = containerW - s.width - 20;
			if (s.corner === 'bl') top = containerH - s.height - 20;
			if (s.corner === 'br') {
				left = containerW - s.width - 20;
				top = containerH - s.height - 20;
			}
			if (s.corner === 'center') {
				left = Math.round((containerW - s.width) / 2);
				top = Math.round((containerH - s.height) / 2);
			}

			return Object.assign({}, s, { left: left, top: top, hideAfterMove: true });
		});
	}

	function animateTo(props, duration = 600) {
		return new Promise((resolve) => {
			$box.animate(props, duration, resolve);
		});
	}

	function fadeOutChangeIn(newStyles, duration = 300) {
		return new Promise((resolve) => {
			$box.fadeOut(duration, function () {
				$box.css(newStyles);
				$box.fadeIn(duration, resolve);
			});
		});
	}

	async function runSequence() {
		if (isAnimating) return;
		isAnimating = true;

		const origBtnText = $btn.text();
		$btn.prop('disabled', true).text('Animating...');

		const steps = createSteps();

		for (const step of steps) {

			await animateTo({ left: step.left, top: step.top, width: step.width, height: step.height }, 600);

			
			await fadeOutChangeIn({ 'font-size': step.fontSize, color: step.color, background: step.background, 'border-radius': step.borderRadius + 'px' }, 300);
		}

		
		await animateTo({ left: origPos.left, top: origPos.top, width: origStyles.width, height: origStyles.height }, 600);
		$box.css({ 'font-size': origStyles.fontSize, color: origStyles.color, background: origStyles.background, 'border-radius': origStyles.borderRadius + 'px' });

		$btn.prop('disabled', false).text(origBtnText);
		isAnimating = false;
	}

	$btn.on('click', function () {
		runSequence();
	});

	});

