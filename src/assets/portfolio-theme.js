(() => {
  const dayStart = 6;
  const nightStart = 18;
  const root = document.documentElement;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const preferenceKey = 'portfolio-theme';
  const control = '[data-theme-control]';
  let preference = 'auto';
  let timer;

  function readPreference() {
    try {
      const saved = localStorage.getItem(preferenceKey);
      preference = saved === 'light' || saved === 'dark' ? saved : 'auto';
    } catch {
      // The current page can still use a manual choice when storage is unavailable.
    }
  }

  function syncControl() {
    const group = document.querySelector(control);
    if (!group) return false;
    const toggle = group.querySelector('[data-theme-toggle]');
    if (!toggle) return false;
    const dark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-checked', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.title = dark ? 'Switch to light theme' : 'Switch to dark theme';
    group.hidden = false;
    return true;
  }

  function updateTheme() {
    window.clearTimeout(timer);
    const now = new Date();
    const hour = now.getHours();
    const isDay = hour >= dayStart && hour < nightStart;

    const theme = preference === 'auto' ? (isDay ? 'light' : 'dark') : preference;
    root.dataset.theme = theme;
    syncControl();
    themeColor?.setAttribute('content', theme === 'light' ? '#f7f8ff' : '#080b12');

    if (preference !== 'auto') return;
    const next = new Date(now);
    next.setHours(isDay ? nightStart : dayStart, 0, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    // Recheck periodically in case the device clock or timezone changes.
    timer = window.setTimeout(updateTheme, Math.min(next - now, 60_000));
  }

  readPreference();
  updateTheme();
  document.addEventListener('DOMContentLoaded', () => {
    if (syncControl()) return;
    const observer = new MutationObserver(() => {
      if (syncControl()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-theme-toggle]');
    if (!button) return;
    preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(preferenceKey, preference); } catch {}
    updateTheme();
  });
  window.addEventListener('storage', event => {
    if (event.key !== preferenceKey && event.key !== null) return;
    readPreference();
    updateTheme();
  });
  window.addEventListener('focus', updateTheme);
  window.addEventListener('pageshow', updateTheme);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) updateTheme();
  });
})();
