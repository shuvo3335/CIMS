(function () {
  const ic = window.CIMS_ICON;
  const CONTRACTS = [
    { no: 'SC-2026-0457', date: '12/10/2026', buyer: 'Al-Amin Grain Traders Ltd.', seller: 'Northern Wheat Exporters Co.', commodity: 'Hard Red Winter Wheat', itemCode: 'WHT-HRW-02', origin: 'United States', qty: '500 MT', price: '285 USD', tol: '10%', tw: '78.5 kg/hl', moisture: '12.5 %', foreign: '', protein: '11.8 %', falling: '325 sec', gluten: '28.0 %', packing: '50 kg PP bags', from: '01/11/2026', to: '30/11/2026' },
    { no: 'SC-2026-0412', date: '28/09/2026', seller: 'Prairie Grain Co-op', commodity: 'Yellow Maize', qty: '1,200 MT', price: '215 USD', from: '15/10/2026', to: '05/11/2026' },
    { no: 'SC-2026-0398', date: '15/09/2026', seller: 'Black Sea Traders JSC', commodity: 'Soft Wheat', qty: '750 MT', price: '248 USD', from: '01/10/2026', to: '20/10/2026' },
    { no: 'SC-2026-0371', date: '02/09/2026', seller: 'Canadian Pulse Ltd.', commodity: 'Lentils', qty: '300 MT', price: '640 USD', from: '20/09/2026', to: '10/10/2026' }
  ];
  const $ = (id) => document.getElementById(id);
  const tbody = $('rows');
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function render(filter) {
    const q = (filter || '').trim().toLowerCase();
    const list = CONTRACTS.filter((c) => !q || [c.no, c.buyer, c.seller].some((v) => (v || '').toLowerCase().includes(q)));
    tbody.innerHTML = list.map((c) =>
      '<tr><td class="link">' + esc(c.no) + '</td><td>' + esc(c.date) + '</td><td>' + esc(c.seller) + '</td><td>' + esc(c.commodity) + '</td><td>' + esc(c.qty) + '</td><td>' + esc(c.price) + '</td><td>' + esc(c.from) + '</td><td>' + esc(c.to) + '</td>' +
      '<td class="act"><div>' +
      '<button type="button" class="icon-btn view" data-view="' + esc(c.no) + '" aria-label="View contract" title="View">' + ic('eye', 16) + '</button>' +
      '<a class="icon-btn" href="review.html" aria-label="Edit contract" title="Edit"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></a>' +
      '<button type="button" class="icon-btn danger" data-del="' + esc(c.no) + '" aria-label="Delete contract ' + esc(c.no) + '" title="Delete"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>' +
      '</div></td></tr>').join('');
    $('empty').hidden = list.length > 0;
  }

  const dl = (items) => '<dl>' + items.map(([k, v, cls]) =>
    '<div' + (cls === 'all' ? ' class="span-all"' : '') + '><dt>' + k + '</dt><dd' + (v ? (cls === 'strong' ? ' class="strong"' : '') : ' class="missing"') + '>' + (v ? esc(v) : 'Not recorded') + '</dd></div>').join('') + '</dl>';
  const sec = (t, items) => '<section><h3>' + t + '</h3>' + dl(items) + '</section>';

  function open(no) {
    const c = CONTRACTS.find((x) => x.no === no);
    $('cv-title').textContent = 'Contract ' + c.no;
    $('cv-sub').textContent = [c.commodity, c.seller].join(' · ');
    $('cv-body').innerHTML =
      sec('Contract information', [['Sales Contract No.', c.no, 'strong'], ['Contract Date', c.date], ['Buyer', c.buyer], ['Seller', c.seller]]) +
      sec('Item details', [['Item Code', c.itemCode], ['Commodity', c.commodity], ['Origin', c.origin], ['Quantity', c.qty], ['Unit Price', c.price], ['Tolerance Qty', c.tol]]) +
      sec('Quality specifications', [['Test Weight', c.tw], ['Moisture', c.moisture], ['Foreign Matter', c.foreign], ['Protein', c.protein], ['Falling Number', c.falling], ['Wet Gluten', c.gluten]]) +
      sec('Shipping', [['Packing', c.packing, 'all'], ['Shipment From', c.from], ['Shipment To', c.to]]);
    $('cv').showModal();
  }

  tbody.addEventListener('click', (e) => {
    const v = e.target.closest('[data-view]'), d = e.target.closest('[data-del]');
    if (v) open(v.dataset.view);
    if (d && confirm('Delete contract ' + d.dataset.del + '?')) {
      CONTRACTS.splice(CONTRACTS.findIndex((x) => x.no === d.dataset.del), 1);
      render($('search').value);
    }
  });
  $('search').addEventListener('input', (e) => render(e.target.value));
  $('print').innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>Print';
  $('print').addEventListener('click', () => window.print());
  $('cv-close').innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>';
  $('cv-close').addEventListener('click', () => $('cv').close());
  $('cv').addEventListener('click', (e) => { if (e.target === $('cv')) $('cv').close(); });
  render();
})();
document.getElementById('rows').addEventListener('click', function (e) {
  var tr = e.target.closest('tr');
  if (tr && !e.target.closest('button, a')) { var b = tr.querySelector('[data-view]'); if (b) b.click(); }
});
