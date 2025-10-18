// Screen Wake Lock functionality for recipe pages
(function() {
  'use strict';

  // Check if Wake Lock API is supported
  if (!('wakeLock' in navigator)) {
    // API not supported - button will remain hidden
    return;
  }

  let wakeLock = null;
  let isActive = false;

  // Get button element
  const button = document.getElementById('wake-lock-toggle');
  if (!button) {
    return;
  }

  // Show the button since API is supported
  button.style.display = 'flex';

  // Get indicator elements
  const activeIndicator = document.getElementById('wake-lock-active');
  const inactiveIndicator = document.getElementById('wake-lock-inactive');

  // Function to request wake lock
  async function requestWakeLock() {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      isActive = true;
      updateUI();

      // Handle wake lock release (e.g., when tab becomes inactive)
      wakeLock.addEventListener('release', () => {
        isActive = false;
        updateUI();
      });

    } catch (err) {
      console.error('Wake Lock request failed:', err);
      isActive = false;
      updateUI();
    }
  }

  // Function to release wake lock
  async function releaseWakeLock() {
    if (wakeLock) {
      try {
        await wakeLock.release();
        wakeLock = null;
        isActive = false;
        updateUI();
      } catch (err) {
        console.error('Wake Lock release failed:', err);
      }
    }
  }

  // Update UI based on wake lock state
  function updateUI() {
    if (isActive) {
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      if (activeIndicator) activeIndicator.style.display = 'inline';
      if (inactiveIndicator) inactiveIndicator.style.display = 'none';
    } else {
      button.classList.remove('active');
      button.setAttribute('aria-pressed', 'false');
      if (activeIndicator) activeIndicator.style.display = 'none';
      if (inactiveIndicator) inactiveIndicator.style.display = 'inline';
    }
  }

  // Toggle wake lock on button click
  button.addEventListener('click', async () => {
    if (isActive) {
      await releaseWakeLock();
    } else {
      await requestWakeLock();
    }
  });

  // Re-request wake lock when page becomes visible again
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible' && isActive && !wakeLock) {
      await requestWakeLock();
    }
  });

  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    if (wakeLock) {
      wakeLock.release();
    }
  });

  // Initialize UI
  updateUI();
})();
