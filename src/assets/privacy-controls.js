(function () {
  'use strict';
  var key = 'portfolio-analytics-consent-v1';
  var measurementId = 'G-VBC70S7YHN';
  var prompt = document.getElementById('privacy-prompt');
  var loaded = false;

  function savedChoice() {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }

  function loadAnalytics() {
    if (loaded || /^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { allow_google_signals: false, allow_ad_personalization_signals: false });
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(script);
  }

  function showPrompt(show) {
    prompt.hidden = !show;
  }

  function clearAnalyticsCookies() {
    document.cookie.split(';').forEach(function (part) {
      var name = part.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) return;
      var domains = ['', '; domain=' + location.hostname];
      var labels = location.hostname.split('.');
      if (labels.length > 2) domains.push('; domain=.' + labels.slice(-2).join('.'));
      domains.forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax' + domain;
      });
    });
  }

  function choose(value) {
    try { localStorage.setItem(key, value); } catch (_) { /* choice remains valid for this page */ }
    showPrompt(false);
    if (value === 'allowed') loadAnalytics();
    else {
      clearAnalyticsCookies();
      if (loaded) location.reload(); // Stop the running tag after withdrawal.
    }
  }

  document.getElementById('privacy-accept').addEventListener('click', function () { choose('allowed'); });
  document.getElementById('privacy-reject').addEventListener('click', function () { choose('rejected'); });
  if (savedChoice() === 'allowed') loadAnalytics();
  else if (savedChoice() !== 'rejected') showPrompt(true);
})();
