(function() {
  const script = document.createElement('script');
  script.src = 'https://scripts.simpleanalyticscdn.com/latest.js';
  script.async = true;
  script.dataset.collectDnt = 'true'; // Set the data-collect-dnt attribute

  document.head.appendChild(script);
})();
