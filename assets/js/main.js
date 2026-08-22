// Populate the "LIVE SYSTEM MAP" bar chart in the hero panel
(function () {
	const container = document.getElementById('bars');
	if (!container) return;

	const BAR_COUNT = 42;

	for (let i = 0; i < BAR_COUNT; i++) {
		const bar = document.createElement('span');
		const height = 15 + Math.random() * 85; // 15% - 100%
		bar.style.height = height + '%';
		container.appendChild(bar);
	}

	// gentle re-randomization so it feels "live"
	setInterval(() => {
		const bars = container.querySelectorAll('span');
		bars.forEach((bar) => {
			if (Math.random() > 0.6) {
				bar.style.transition = 'height 0.6s ease';
				bar.style.height = (15 + Math.random() * 85) + '%';
			}
		});
	}, 1400);
})();
