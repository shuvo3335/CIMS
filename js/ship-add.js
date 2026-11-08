(function () {
  const $ = (id) => document.getElementById(id);
  const form = $('form');
  let file = null;
  function show(f) {
    file = f; $('ferr').hidden = true;
    $('chosen').hidden = !f; $('nofile').hidden = !!f;
    if (f) { $('cname').textContent = f.name; $('cmeta').textContent = (f.size / 1048576).toFixed(1) + ' MB · Selected'; }
  }
  function pick(f) {
    if (!f) return;
    if (!/\.pdf$/i.test(f.name)) { $('ferr').textContent = 'Please choose a PDF file.'; $('ferr').hidden = false; return; }
    if (f.size > 20 * 1048576) { $('ferr').textContent = 'File is larger than 20 MB.'; $('ferr').hidden = false; return; }
    show(f);
  }
  const drop = $('drop');
  $('browse').addEventListener('click', () => $('file').click());
  $('file').addEventListener('change', (e) => pick(e.target.files[0]));
  $('remove').addEventListener('click', () => { $('file').value = ''; show(null); });
  ['dragenter', 'dragover'].forEach((e) => drop.addEventListener(e, (ev) => { ev.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((e) => drop.addEventListener(e, (ev) => { ev.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', (ev) => pick(ev.dataTransfer.files[0]));

  $('clear').addEventListener('click', () => { form.reset(); $('file').value = ''; show(null); $('saved').hidden = true; });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let first = null;
    form.querySelectorAll('[required]').forEach((el) => { const bad = !el.value.trim(); el.classList.toggle('invalid', bad); if (bad && !first) first = el; });
    if (first) { first.focus(); $('saved').hidden = true; } else { $('saved').hidden = false; }
  });
})();
