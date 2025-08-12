(function () {
  const basePath = '/RSCWebPage';

  const routes = {
    '/': 'home',
    '/filereport': 'filereport',
    '/abt': 'abt',
    '/utils': 'utils'  // <-- Added utils route here
  };

  function normalizePath(path) {
    // Remove basePath prefix if present, fallback to '/'
    if (path.startsWith(basePath)) {
      let p = path.slice(basePath.length);
      return p === '' ? '/' : p;
    }
    return path;
  }

  function showPage(id) {
    document.querySelectorAll('.page').forEach(s => {
      s.hidden = s.id !== id;
    });
  }

  function handlePath(path, replace = false) {
    // Normalize path to keys in routes
    const normPath = normalizePath(path);
    const id = routes[normPath] || 'home';
    showPage(id);
    if (replace) history.replaceState({}, '', basePath + (normPath === '/' ? '/' : normPath));
    else history.pushState({}, '', basePath + (normPath === '/' ? '/' : normPath));
  }

  // On initial load
  const initial = window.location.pathname;
  if (routes[normalizePath(initial)]) {
    handlePath(initial, true);
  } else {
    handlePath('/', true);
  }

  // Intercept nav clicks
  document.querySelectorAll('.nav-btn').forEach(a => {
    a.addEventListener('click', function (ev) {
      ev.preventDefault();
      const path = a.getAttribute('data-path') || a.getAttribute('href') || '/';
      handlePath(path);
    });
  });

  // Handle browser back/forward
  window.addEventListener('popstate', function () {
    const p = window.location.pathname;
    const id = routes[normalizePath(p)] || 'home';
    showPage(id);
  });
})();
