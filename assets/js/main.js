// ============================================================
// 0. Size the grid background to the full page so it can fade
//    out near the actual bottom of the content
// ============================================================
(function () {
	const grid = document.getElementById('grid-bg');
	if (!grid) return;
	function resize() {
		grid.style.height = document.documentElement.scrollHeight + 'px';
	}
	window.addEventListener('load', resize);
	window.addEventListener('resize', resize);
	setTimeout(resize, 500); // catch late layout shifts (fonts/images)
})();


// ============================================================
// 1. Live system map bar chart (waveform + moving playhead)
// ============================================================
(function () {
	const container = document.getElementById('bars');
	if (!container) return;

	const BAR_COUNT = 40;
	for (let i = 0; i < BAR_COUNT; i++) {
		const bar = document.createElement('span');
		bar.style.height = (15 + Math.random() * 85) + '%';
		container.appendChild(bar); // playhead div (already in HTML) stays on top
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
// 1b. Orbiting chips + diamonds around the hero portrait
//     (Discipline + Ident stay put — see their fixed CSS transforms)
// ============================================================
(function () {
	const portrait = document.getElementById('portrait');
	if (!portrait) return;
	const items = document.querySelectorAll('.orbit-item');
	if (!items.length) return;

	const total = items.length;
	let angle = 0;
	const speed = 0.0016;

	function frame() {
		const rect = portrait.getBoundingClientRect();
		const radius = rect.width / 2 + 58;
		angle += speed;

		items.forEach((el, i) => {
			const a = angle + (i / total) * Math.PI * 2;
			const x = Math.cos(a) * radius;
			const y = Math.sin(a) * radius * 0.62; // flatten into an ellipse
			const rotate = el.dataset.rotate ? ` rotate(${el.dataset.rotate}deg)` : '';
			el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))${rotate}`;
		});

		requestAnimationFrame(frame);
	}
	requestAnimationFrame(frame);
})();

// ============================================================
// 2. Project "Open File" — full-screen detail view
// ============================================================
(function () {
	const overview = document.getElementById('project-overview');
	const details = document.querySelectorAll('.project-detail');
	const openLinks = document.querySelectorAll('.open-file');
	const backLinks = document.querySelectorAll('.back-to-overview');

	if (!overview || !details.length) return;

	function showDetail(id) {
		details.forEach((d) => d.classList.remove('active'));
		const target = document.getElementById(id);
		if (target) {
			target.classList.add('active');
			target.scrollTop = 0;
			document.body.classList.add('detail-open');
		}
	}

	function showOverview() {
		details.forEach((d) => d.classList.remove('active'));
		document.body.classList.remove('detail-open');
		overview.classList.remove('is-hidden');
		document.getElementById('projects').scrollIntoView({ behavior: 'instant', block: 'start' });
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

	// Escape key also closes the detail view
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && document.body.classList.contains('detail-open')) {
			showOverview();
		}
	});
})();

// ============================================================
// 3. Design-iteration sliders (works for every .iteration-slider
//    on the page — Project 1, Project 2, Project 3, etc.)
// ============================================================
document.querySelectorAll('.iteration-slider').forEach((slider) => {
	const imgs = slider.querySelectorAll('.slider-img');
	const counter = slider.querySelector('.slider-counter');
	const caption = slider.querySelector('.slider-caption');
	const buttons = slider.querySelectorAll('.slider-btn');
	const prevBtn = buttons[0];
	const nextBtn = buttons[1];

	if (!imgs.length) return;
	let idx = 0;

	function show(i) {
		imgs.forEach((img, n) => img.classList.toggle('active', n === i));
		if (counter) counter.textContent = (i + 1) + ' / ' + imgs.length;
		if (caption) caption.textContent = imgs[i].dataset.caption || '';
	}

	if (prevBtn) {
		prevBtn.addEventListener('click', () => {
			idx = (idx - 1 + imgs.length) % imgs.length;
			show(idx);
		});
	}
	if (nextBtn) {
		nextBtn.addEventListener('click', () => {
			idx = (idx + 1) % imgs.length;
			show(idx);
		});
	}

	show(0);
});

// ============================================================
// 4. Footer "Return to Origin" button
// ============================================================
(function () {
	const btn = document.getElementById('return-to-top');
	if (!btn) return;
	btn.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
})();
