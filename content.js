(() => {
  if (document.getElementById('fbgl-panel')) return;
  const sleep = t => new Promise(r => setTimeout(r, t));
  let running = false, stop = false;

  const panel = document.createElement('div');
  panel.id = 'fbgl-panel';
  panel.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:999999;background:#fff;border:1px solid #ccc;border-radius:10px;padding:12px;box-shadow:0 2px 10px rgba(0,0,0,.25);font:14px Arial,sans-serif;width:240px;color:#222';
  panel.innerHTML = `
    <div style="font-weight:bold;margin-bottom:8px">FB Group Leaver</div>
    <label>Groups to leave: <input id="fbgl-max" type="number" min="1" max="50" value="10" style="width:50px"></label>
    <div style="margin:8px 0">
      <button id="fbgl-start" style="background:#d93025;color:#fff;border:0;border-radius:6px;padding:6px 10px;cursor:pointer">Start</button>
      <button id="fbgl-stop" style="border:1px solid #999;background:#f5f5f5;border-radius:6px;padding:6px 10px;cursor:pointer">Stop</button>
    </div>
    <div id="fbgl-status" style="font-size:12px;color:#555">Idle</div>`;
  document.body.appendChild(panel);
  const status = t => document.getElementById('fbgl-status').textContent = t;

  const closeMenu = async () => {
    for (const t of [document.activeElement, document.body, document]) {
      try { t.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, which: 27, bubbles: true })); } catch (e) {}
    }
    await sleep(500);
    if (document.querySelector('[role="menu"]')) { document.body.click(); await sleep(500); }
  };

  const getButtons = () => [...document.querySelectorAll(
    '[role="button"][aria-haspopup="menu"], [role="button"][aria-label^="More"]'
  )].filter(e => e.offsetParent && !panel.contains(e) && !e.dataset.fbglSkip);

  async function run() {
    if (running) return;
    running = true; stop = false;
    const max = parseInt(document.getElementById('fbgl-max').value, 10) || 10;
    let left = 0, skipped = 0;

    while (left < max && !stop) {
      const btn = getButtons()[0];
      if (!btn) { status('No more groups to try. Left ' + left + ', skipped ' + skipped); break; }

      btn.click(); await sleep(1000);
      const leave = [...document.querySelectorAll('[role="menuitem"]')]
        .find(e => /leave group/i.test(e.textContent));

      if (!leave) {               // no Leave option for this group -> skip it
        btn.dataset.fbglSkip = '1';
        skipped++;
        status('Skipped ' + skipped + ' (no Leave option). Left ' + left);
        await closeMenu();
        continue;
      }

      leave.click(); await sleep(1200);
      const confirm = [...document.querySelectorAll('[role="dialog"] [role="button"], [role="dialog"] button')]
        .find(e => /^leave group$/i.test(e.textContent.trim()));
      if (!confirm) {
        btn.dataset.fbglSkip = '1';
        skipped++;
        await closeMenu();
        continue;
      }
      confirm.click(); left++;
      status('Left ' + left + ' of ' + max + ' (skipped ' + skipped + ')');
      await sleep(3000 + Math.random() * 2000);
    }
    if (stop) status('Stopped. Left ' + left + ', skipped ' + skipped);
    else if (left >= max) status('Done. Left ' + left + ', skipped ' + skipped + '. Wait a few minutes before the next batch.');
    running = false;
  }
  document.getElementById('fbgl-start').onclick = run;
  document.getElementById('fbgl-stop').onclick = () => { stop = true; };
})();
