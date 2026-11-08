(function () {
  const MAX = 20 * 1024 * 1024;
  const $ = (id) => document.getElementById(id);
  const drop = $('drop'), input = $('file'), err = $('err'), card = $('progressCard');
  $('progressCard').hidden = true;

  function fail(title, msg) { $('errTitle').textContent = title; $('errMsg').textContent = msg; err.hidden = false; card.hidden = true; }
  function size(n) { return n >= 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB'; }

  function handle(file) {
    err.hidden = true;
    if (!file) return;
    if (!/\.pdf$/i.test(file.name) || (file.type && file.type !== 'application/pdf')) return fail('Not a PDF', 'This file is not a PDF. Please choose a file that ends in .pdf and try again.');
    if (file.size > MAX) return fail('File too large', 'This file is larger than 20 MB. Please choose a smaller PDF.');
    $('fname').textContent = file.name;
    $('fmeta').textContent = size(file.size);
    $('fstate').textContent = 'Reading';
    card.hidden = false;
    let p = 0;
    const t = setInterval(() => {
      p = Math.min(100, p + 8);
      $('bar').style.width = p + '%';
      $('status').textContent = 'Reading your contract… ' + p + '%';
      if (p >= 100) {
        clearInterval(t);
        $('fstate').textContent = 'Done';
        const m = file.name.match(/SC-\d{4}-\d{4}/i);
        if (m) $('doneNo').textContent = m[0].toUpperCase();
        $('done').showModal();
      }
    }, 150);
  }

  $('browse').addEventListener('click', () => input.click());
  input.addEventListener('change', () => handle(input.files[0]));
  ['dragenter', 'dragover'].forEach((e) => drop.addEventListener(e, (ev) => { ev.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((e) => drop.addEventListener(e, (ev) => { ev.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', (ev) => handle(ev.dataTransfer.files[0]));
})();
