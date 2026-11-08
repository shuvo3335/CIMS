(function () {
  const PIS = [
    { no: 'PI-2026-0112', date: '31/10/2026', validity: '30/11/2026', contract: 'SC-2026-0457', buyer: 'Al-Amin Grain Traders Ltd.', seller: 'Northern Wheat Exporters Co.', commodity: 'Hard Red Winter Wheat', itemCode: 'WHT-HRW-02', origin: 'United States', unitPrice: '285.00', spis: [{ no: 'SPI-1', qty: '300 MT', amount: '85,500.00' }, { no: 'SPI-2', qty: '200 MT', amount: '57,000.00' }] },
    { no: 'PI-2026-0109', date: '24/10/2026', validity: '20/11/2026', contract: 'SC-2026-0431', buyer: 'Delta Flour Mills', seller: 'Volga Grain Export LLC', commodity: 'Milling Wheat', itemCode: 'WHT-MIL-05', origin: 'Russia', unitPrice: '275.00', spis: [{ no: 'SPI-1', qty: '320 MT', amount: '88,000.00' }] },
    { no: 'PI-2026-0104', date: '15/10/2026', validity: '10/11/2026', contract: 'SC-2026-0402', buyer: 'Coastal Feed Imports', seller: 'Prairie Agri Exports Inc.', commodity: 'Yellow Soybean', itemCode: 'SOY-YEL-01', origin: 'Canada', unitPrice: '245.00', spis: [{ no: 'SPI-1', qty: '250 MT', amount: '61,250.00' }] }
  ];
  const $ = (id) => document.getElementById(id);
  const open = {};
  const chev = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="transition:transform .15s;transform:rotate(ROTdeg)"><polyline points="9 18 15 12 9 6"/></svg>';
  const spiTable = (p) => '<table><thead><tr><th scope="col">SPI No.</th><th scope="col">SPI Quantity</th><th scope="col">SPI Amount (USD)</th></tr></thead><tbody>' +
    p.spis.map((s) => '<tr><td class="link">' + s.no + '</td><td>' + s.qty + '</td><td>' + s.amount + '</td></tr>').join('') + '</tbody></table>';

  function render(filter) {
    const q = (filter || '').trim().toLowerCase();
    const list = PIS.filter((p) => !q || p.no.toLowerCase().includes(q) || p.contract.toLowerCase().includes(q));
    $('rows').innerHTML = list.map((p) => {
      const o = !!open[p.no], label = o ? 'Hide SPI' : 'View SPI (' + p.spis.length + ')';
      return '<tr><td><button type="button" class="btn btn-outline" data-toggle="' + p.no + '" aria-expanded="' + o + '" style="min-height:36px;padding:0 10px;font-size:13px">' + chev.replace('ROT', o ? 90 : 0) + label + '</button></td>' +
        '<td class="link">' + p.no + '</td><td>' + p.date + '</td><td>' + p.validity + '</td><td class="link">' + p.contract + '</td><td>' + p.buyer + '</td><td>' + p.seller + '</td><td>' + p.commodity + '</td><td>' + p.itemCode + '</td><td>' + p.origin + '</td><td>' + p.unitPrice + '</td>' +
        '<td class="act"><div><button type="button" class="icon-btn view" data-view="' + p.no + '" aria-label="View PI" title="View">' + CIMS_ICON('eye', 16) + '</button></div></td></tr>' +
        (o ? '<tr><td colspan="12" class="spi-detail"><p>SPI details for ' + p.no + '</p>' + spiTable(p) + '</td></tr>' : '');
    }).join('');
    $('empty').hidden = list.length > 0;
  }

  const dl = (items) => '<dl>' + items.map(([k, v, c]) => '<div><dt>' + k + '</dt><dd' + (c ? ' class="' + c + '"' : '') + '>' + v + '</dd></div>').join('') + '</dl>';
  function show(no) {
    const p = PIS.find((x) => x.no === no);
    $('pv-title').textContent = p.no;
    $('pv-sub').textContent = p.commodity + ' · ' + p.buyer;
    $('pv-body').innerHTML =
      '<section><h3>PI information</h3>' + dl([['PI No.', p.no, 'link'], ['PI Date', p.date], ['PI Validity', p.validity], ['Contract No.', p.contract, 'link'], ['Buyer', p.buyer], ['Seller', p.seller]]) + '</section>' +
      '<section><h3>Item details</h3>' + dl([['Commodity', p.commodity], ['Item Code', p.itemCode], ['Origin', p.origin], ['Unit Price', p.unitPrice + ' USD']]) + '</section>' +
      '<section><h3>SPI details</h3>' + spiTable(p) + '</section>';
    $('pv').showModal();
  }
  $('rows').addEventListener('click', (e) => {
    const t = e.target.closest('[data-toggle]'), v = e.target.closest('[data-view]');
    if (t) { open[t.dataset.toggle] = !open[t.dataset.toggle]; render($('pisearch').value); }
    if (v) show(v.dataset.view);
  });
  $('pisearch').addEventListener('input', (e) => render(e.target.value));
  $('pv-close').addEventListener('click', () => $('pv').close());
  $('pv').addEventListener('click', (e) => { if (e.target === $('pv')) $('pv').close(); });
  $('pv-print').addEventListener('click', () => window.print());
  render();
})();
