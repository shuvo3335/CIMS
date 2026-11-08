// Injects the shared sidebar, top bar and footer into every page.
(function () {
  const I = {
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    filePlus: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="12" x2="12" y2="18"/><line x1="9" y1="15" x2="15" y2="15"/>',
    list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
    receipt: '<path d="M6 2h12v18l-3-2-3 2-3-2-3 2z"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/>',
    eye: '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
    truck: '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    plus: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>',
    bank: '<line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
    table: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
    bars: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    userPlus: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
  };
  window.CIMS_ICON = (name, size) =>
    '<svg class="icon" width="' + (size || 18) + '" height="' + (size || 18) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + I[name] + '</svg>';
  const ic = window.CIMS_ICON;

  const page = document.body.dataset.page || '';
  const topTabs = document.body.dataset.tabs === 'true';
  const link = (href, id, icon, label) =>
    '<a class="nav-item' + (page === id ? ' active' : '') + '" href="' + href + '"' + (page === id ? ' aria-current="page"' : '') + '>' + ic(icon) + label + '</a>';
  const group = (open, icon, label, items) =>
    '<details' + (open ? ' open' : '') + '><summary>' + ic(icon) + label + '</summary><div class="nav-sub">' + items + '</div></details>';
  const has = (...ids) => ids.includes(page);

  const sidebar =
    '<aside class="sidebar" aria-label="Navigation"><p class="menu-label">MENU</p>' +
    '<a class="nav-item" href="#">' + ic('grid') + 'DashBoard</a>' +
    group(true, 'file', 'Contract', link('index.html', 'upload', 'filePlus', 'Create Contract') + link('records.html', 'records', 'list', 'Contract List')) +
    group(has('create-pi', 'view-pi'), 'receipt', 'Proforma Invoice', link('create-pi.html', 'create-pi', 'filePlus', 'Create PI') + link('view-pi.html', 'view-pi', 'eye', 'View PI')) +
    group(has('ship-details', 'ship-add'), 'truck', 'Shipment', link('ship-details.html', 'ship-details', 'eye', 'View ship details') + link('ship-add.html', 'ship-add', 'plus', 'Add shipment details')) +
    '<a class="nav-item" href="#">' + ic('bank') + 'LC</a>' +
    '<a class="nav-item" href="#">' + ic('table') + 'Templates</a>' +
    '<a class="nav-item" href="#">' + ic('bars') + 'Reports</a>' +
    group(false, 'user', 'User', '<a class="nav-item" href="#">' + ic('userPlus') + 'Add User</a><a class="nav-item" href="#">' + ic('lock') + 'Permission</a>') +
    '</aside>';

  const header =
    '<header class="topbar"><div class="brand">' +
    '<button type="button" class="menu-toggle" id="menuToggle" aria-label="Toggle menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>' +
    '<div class="brand-mark"></div><span>Contract &amp; Import Management System</span></div>' +
    (topTabs ? '<nav class="top-nav"><a href="index.html" class="active">Upload</a><a href="records.html">Records</a></nav>' : '') +
    '</header>';

  const footer =
    '<footer class="footer"><span>© 2026 Contract &amp; Import Management System</span><a href="#">Help &amp; support</a></footer>';

  const app = document.querySelector('.app');
  app.insertAdjacentHTML('afterbegin', sidebar + header);
  app.insertAdjacentHTML('beforeend', footer);
  document.getElementById('menuToggle').addEventListener('click', () => document.body.classList.toggle('nav-open'));
})();
