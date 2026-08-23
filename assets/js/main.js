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
// 3. Design-iteration slider (inside Project 1 detail page)
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
