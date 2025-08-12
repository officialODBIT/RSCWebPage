// Simple client-side router: show sections based on path (/, /filereport, /abt, /utils)
// keeps behavior single-page while updating the URL so links point to the requested path.

(function () {
  const routes = {
    '/': 'home',
    '/filereport': 'filereport',
    '/abt': 'abt',
    '/utils': 'utils'
  };

  function showPage(id) {
    document.querySelectorAll('.page').forEach(s => {
      if (s.id === id) s.hidden = false;
      else s.hidden = true;
    });
  }

  function handlePath(path, replace = false) {
    const id = routes[path] || 'home';
    showPage(id);
    if (replace) history.replaceState({}, '', path);
    else history.pushState({}, '', path);
  }

  // initial load: pick the page based on location.pathname
  const initial = window.location.pathname;
  if (routes[initial]) {
    // replaceState so back button behavior is OK
    handlePath(initial, true);
  } else {
    handlePath('/', true);
  }

  // intercept nav clicks (so anchor hrefs still show the path but we don't reload)
  document.querySelectorAll('.nav-btn').forEach(a => {
    a.addEventListener('click', function (ev) {
      const path = a.getAttribute('data-path') || a.getAttribute('href');
      ev.preventDefault();
      handlePath(path, false);
    });
  });

  // support browser back/forward
  window.addEventListener('popstate', function () {
    const p = window.location.pathname;
    const id = routes[p] || 'home';
    showPage(id);
  });
})();
