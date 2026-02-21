// ============================================================
// DATE_TIME.JS — Error Pages Dynamic Info
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0] + ' UTC';
  
    const timeEl = document.getElementById('error-time');
    if (timeEl) timeEl.textContent = timestamp;
  
    const pathEl = document.getElementById('error-path');
    if (pathEl) pathEl.textContent = window.location.pathname;
  });