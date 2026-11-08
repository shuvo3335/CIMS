(function () {
  const CONTRACTS = [
    { no: 'SC-2026-0457', buyer: 'Al-Amin Grain Traders Ltd.', seller: 'Northern Wheat Exporters Co.', commodity: 'Hard Red Winter Wheat', itemCode: 'WHT-HRW-02', origin: 'United States' },
    { no: 'SC-2026-0431', buyer: 'Delta Flour Mills', seller: 'Volga Grain Export LLC', commodity: 'Milling Wheat', itemCode: 'WHT-MIL-05', origin: 'Russia' },
    { no: 'SC-2026-0402', buyer: 'Coastal Feed Imports', seller: 'Prairie Agri Exports Inc.', commodity: 'Yellow Soybean', itemCode: 'SOY-YEL-01', origin: 'Canada' }
  ];
  const $ = (id) => document.getElementById(id);
  const sel = $('pi3');
  sel.innerHTML = CONTRACTS.map((c) => '<option>' + c.no + '</option>').join('');
  const map = { buyer: 'pi4', seller: 'pi5', commodity: 'pi7', itemCode: 'pi8', origin: 'pi9' };
  function fill() {
    const c = CONTRACTS.find((x) => x.no === sel.value) || CONTRACTS[0];
    Object.keys(map).forEach((k) => { $(map[k]).value = c[k]; });
  }
  sel.addEventListener('change', fill);

  let rows = [{ id: 1, no: 'SPI-1', qty: '500', unit: 'MT' }];
  const price = () => parseFloat($('pi12').value.replace(/,/g, '')) || 0;
  const amount = (r) => ((parseFloat(r.qty) || 0) * price()).toFixed(2);
  function draw() {
    $('spis').innerHTML = rows.map((r) =>
      '<div class="spi-row" data-id="' + r.id + '"><div class="grid3">' +
      '<div class="field"><label>SPI No.</label><input data-k="no" value="' + r.no + '"></div>' +
      '<div class="field"><label>SPI Quantity</label><div class="qty"><input data-k="qty" inputmode="decimal" value="' + r.qty + '"><select data-k="unit">' +
      ['MT', 'T', 'TEU', 'FEU', 'BBL'].map((u) => '<option' + (u === r.unit ? ' selected' : '') + '>' + u + '</option>').join('') + '</select></div></div>' +
      '<div class="field"><label>SPI Amount (USD)</label><input readonly data-amt value="' + amount(r) + '"></div></div>' +
      '<button type="button" class="btn btn-outline" data-del aria-label="Delete SPI" title="Delete SPI"' + (rows.length < 2 ? ' disabled' : '') + ' style="color:var(--danger);border-color:var(--danger-line)">Delete SPI</button></div>').join('');
  }
  $('spis').addEventListener('input', (e) => {
    const row = e.target.closest('.spi-row'); if (!row) return;
    const r = rows.find((x) => x.id == row.dataset.id);
    r[e.target.dataset.k] = e.target.value;
    row.querySelector('[data-amt]').value = amount(r);
  });
  $('spis').addEventListener('click', (e) => {
    const b = e.target.closest('[data-del]'); if (!b || rows.length < 2) return;
    rows = rows.filter((x) => x.id != b.closest('.spi-row').dataset.id); draw();
  });
  $('addSpi').addEventListener('click', () => { rows.push({ id: Date.now(), no: 'SPI-' + (rows.length + 1), qty: '', unit: 'MT' }); draw(); });
  $('pi12').addEventListener('input', () => document.querySelectorAll('.spi-row').forEach((el) => { el.querySelector('[data-amt]').value = amount(rows.find((x) => x.id == el.dataset.id)); }));

  $('clear').addEventListener('click', () => {
    $('form').reset(); rows = [{ id: 1, no: 'SPI-1', qty: '', unit: 'MT' }]; fill(); draw(); $('saved').hidden = true;
  });
  function msg(t) { $('saved').textContent = t; $('saved').hidden = false; }
  $('draft').addEventListener('click', () => msg('Draft saved.'));
  $('savePi').addEventListener('click', () => {
    let first = null;
    $('form').querySelectorAll('[required]').forEach((el) => { const bad = !el.value.trim(); el.classList.toggle('invalid', bad); if (bad && !first) first = el; });
    if (first) { first.focus(); $('saved').hidden = true; } else msg('PI saved.');
  });
  fill(); draw();
})();
