(() => {
  const dayStart = 6;
  const nightStart = 18;
  const root = document.documentElement;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  let timer;

  function updateTheme() {
    window.clearTimeout(timer);
    const now = new Date();
    const hour = now.getHours();
    const isDay = hour >= dayStart && hour < nightStart;

    root.dataset.theme = isDay ? 'light' : 'dark';
    themeColor?.setAttribute('content', isDay ? '#f7f8ff' : '#080b12');

    const next = new Date(now);
    next.setHours(isDay ? nightStart : dayStart, 0, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    // Recheck periodically in case the device clock or timezone changes.
    timer = window.setTimeout(updateTheme, Math.min(next - now, 60_000));
  }

  updateTheme();
  window.addEventListener('focus', updateTheme);
  window.addEventListener('pageshow', updateTheme);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) updateTheme();
  });
})();
