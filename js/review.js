(function () {
  const form = document.getElementById('form');
  const inputs = () => Array.from(form.querySelectorAll('input, select'));
  const initial = {};
  inputs().forEach((el) => { initial[el.id] = el.value; });

  // The unit price is flagged until the user edits it.
  const price = document.getElementById('f10');
  price.addEventListener('input', () => { price.classList.remove('invalid'); const n = price.nextElementSibling; if (n) n.remove(); });

  document.getElementById('clear').addEventListener('click', () => {
    inputs().forEach((el) => { el.value = el.tagName === 'SELECT' ? el.options[0].value : ''; el.classList.remove('invalid'); });
    document.querySelectorAll('.note').forEach((n) => n.remove());
    document.getElementById('f1').focus();
  });
  document.getElementById('changeNo').addEventListener('click', (e) => { e.preventDefault(); const f = document.getElementById('f1'); f.focus(); f.select(); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let first = null;
    form.querySelectorAll('[required]').forEach((el) => {
      const bad = !el.value.trim();
      el.classList.toggle('invalid', bad);
      if (bad && !first) first = el;
    });
    const saved = document.getElementById('saved');
    if (first) { first.focus(); saved.hidden = true; return; }
    saved.hidden = false;
  });
  document.getElementById('save').addEventListener('click', (e) => { e.preventDefault(); form.requestSubmit(); });
})();
