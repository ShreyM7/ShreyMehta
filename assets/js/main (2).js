// ============================================================
// 1. Live system map bar chart (waveform + moving playhead)
// ============================================================
(function () {
	const container = document.getElementById('bars');
	if (!container) return;

	const BAR_COUNT = 48;
	for (let i = 0; i < BAR_COUNT; i++) {
		const bar = document.createElement('span');
		bar.style.height = (15 + Math.random() * 85) + '%';
		container.appendChild(bar); // playhead div (already in HTML) stays on top via z-index/order
	}

	setInterval(() => {
		const bars = container.querySelectorAll('span');
		bars.forEach((bar) => {
			if (Math.random() > 0.55) {
				bar.style.height = (15 + Math.random() * 85) + '%';
			}
		});
	}, 1200);
})();

// ============================================================
// 2. Orbiting tag chips around the hero portrait
// ============================================================
(function () {
	const portrait = document.getElementById('portrait');
	if (!portrait) return;
	const chips = portrait.querySelectorAll('.orbit-chip');
	if (!chips.length) return;

	let angle = 0;
	const speed = 0.0018; // radians per frame — slow, steady drift

	function frame() {
		const rect = portrait.getBoundingClientRect();
		const radius = rect.width / 2 + 52; // sit just outside the ring
		angle += speed;

		chips.forEach((chip, i) => {
			const chipAngle = angle + (i / chips.length) * Math.PI * 2;
			const x = Math.cos(chipAngle) * radius;
			const y = Math.sin(chipAngle) * radius * 0.62; // flatten slightly for an elliptical orbit
			chip.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
		});

		requestAnimationFrame(frame);
	}
	requestAnimationFrame(frame);
})();

// ============================================================
// 3. Project "Open File" detail pages
// ============================================================
(function () {
	const overview = document.getElementById('project-overview');
	const details = document.querySelectorAll('.project-detail');
	const openLinks = document.querySelectorAll('.open-file');
	const backLinks = document.querySelectorAll('.back-to-overview');

	if (!overview || !details.length) return;

	function showDetail(id) {
		overview.classList.add('is-hidden');
		details.forEach((d) => d.classList.remove('active'));
		const target = document.getElementById(id);
		if (target) {
			target.classList.add('active');
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	function showOverview() {
		details.forEach((d) => d.classList.remove('active'));
		overview.classList.remove('is-hidden');
		overview.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	openLinks.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			showDetail(link.dataset.detail);
		});
	});

	backLinks.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			showOverview();
		});
	});
})();

// ============================================================
// 4. Design-iteration slider (inside Project 1 detail page)
// ============================================================
(function () {
	const slider = document.querySelector('.iteration-slider');
	if (!slider) return;

	const imgs = slider.querySelectorAll('.slider-img');
	const counter = document.getElementById('iter-counter');
	const caption = document.getElementById('iter-caption');
	let idx = 0;

	function show(i) {
		imgs.forEach((img, n) => img.classList.toggle('active', n === i));
		counter.textContent = (i + 1) + ' / ' + imgs.length;
		caption.textContent = imgs[i].dataset.caption || '';
	}

	document.getElementById('iter-next').addEventListener('click', () => {
		idx = (idx + 1) % imgs.length;
		show(idx);
	});
	document.getElementById('iter-prev').addEventListener('click', () => {
		idx = (idx - 1 + imgs.length) % imgs.length;
		show(idx);
	});

	show(0);
})();
