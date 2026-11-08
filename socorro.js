// Chacoalhar pede ajuda (May 21:09 e 21:10; arquivo só, carregado por app, jogos e máquinas: Hermes 21:39).
// Chacoalhou o celular em qualquer tela: sai um recado na Geral pra todos os robôs. O popup só diz que foi quando foi de verdade;
// sem rede ou com o GitHub travado, diz que NÃO foi e guarda pra mandar sozinho depois (Sigma 21:37). Não depende de nada da página.
(() => {
  if (window.Socorro) return;
  const REPO = 'mayarainstinct-stack/Inst', ARQ = 'CAIXA-DE-ENTRADA.md', FILA = 'socorro-fila';
  const ler = k => { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }, grava = (k, v) => { try { v ? localStorage.setItem(k, v) : localStorage.removeItem(k); } catch (e) {} };
  const pad = n => String(n).padStart(2, '0'), stamp = d => pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  const versao = () => (document.querySelector('meta[name="app-versao"]') || {}).content || '';
  const pagina = () => /jogos/.test(location.pathname) ? 'Jogos' : /maquinas/.test(location.pathname) ? 'Máquinas' : 'app';
  const onde = () => { try { if (window.socorroOnde) return window.socorroOnde(); } catch (e) {} return pagina(); };
  const b64e = t => btoa(unescape(encodeURIComponent(t))), b64d = t => decodeURIComponent(escape(atob(String(t).replace(/\s/g, ''))));
  let motivo = '';
  async function gravaLinha(linha) {   // lê a caixa mais nova com o sha e acrescenta a linha no fim; 409 = alguém gravou junto, tenta de novo
    const token = ler('gh-token'); if (!token) { motivo = 'o app tá sem a chave'; return false; }
    if (navigator.onLine === false) { motivo = 'tá sem internet'; return false; }
    const url = 'https://api.github.com/repos/' + REPO + '/contents/' + ARQ, h = { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json' };
    for (let t = 0; t < 4; t++) {
      try {
        const r = await fetch(url, { headers: h, cache: 'no-store' });
        if (r.status === 403 || r.status === 429) { motivo = 'o GitHub segurou a conexão'; return false; }
        if (!r.ok) { motivo = 'o GitHub não respondeu'; return false; }
        const j = await r.json(), atual = b64d(j.content || '');
        const w = await fetch(url, { method: 'PUT', headers: h, body: JSON.stringify({ message: 'Pedido de ajuda (chacoalhou o celular)', content: b64e(atual.replace(/\s*$/, '\n') + linha + '\n'), sha: j.sha }) });
        if (w.ok) return true;
        if (w.status !== 409 && w.status !== 422) { motivo = 'o GitHub não aceitou'; return false; }
      } catch (e) { motivo = 'a conexão caiu'; }
      await new Promise(ok => setTimeout(ok, 700));
    }
    return false;
  }
  const estilo = () => { if (document.getElementById('socorro-css')) return; const s = document.createElement('style'); s.id = 'socorro-css';
    s.textContent = '.socorro-pop{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:16px;background:rgba(0,0,0,.6);font-family:inherit}.socorro-pop .sc-card{width:min(360px,100%);background:#171A21;color:#F1F2F4;border:2px solid #10B981;border-radius:28px;padding:22px 20px 18px;box-shadow:0 20px 50px rgba(0,0,0,.5);animation:sc-cresce .26s cubic-bezier(.2,.8,.2,1) both}.socorro-pop.nao .sc-card{border-color:#F87171}.socorro-pop p{margin:4px 4px 16px;font-size:17px;line-height:1.4;text-align:center}.socorro-pop button{display:block;width:100%;height:48px;border:0;border-radius:999px;background:#059669;color:#fff;font:inherit;font-size:17px;font-weight:700}.socorro-pop.nao button{background:#B91C1C}@keyframes sc-cresce{from{transform:scale(.6)}to{transform:none}}';
    document.head.append(s); };
  const mostra = (foi, depois) => {
    estilo(); const ov = document.createElement('div'), card = document.createElement('div'), p = document.createElement('p'), ok = document.createElement('button');
    ov.className = 'socorro-pop' + (foi ? '' : ' nao'); card.className = 'sc-card'; ok.type = 'button'; ok.textContent = 'Ok';
    p.textContent = foi ? (depois ? 'O pedido de ajuda que tinha ficado guardado foi agora. Os robôs já vão olhar o que foi.' : 'Recebemos teu pedido de ajuda. Já vamos olhar o que foi.') : 'O pedido de ajuda NÃO foi: ' + (motivo || 'não consegui gravar') + '. Guardei e mando sozinho assim que der.';
    const fecha = () => ov.remove(); ok.onclick = fecha; ov.onclick = e => { if (e.target === ov) fecha(); };
    card.append(p, ok); ov.append(card); document.body.append(ov); if (navigator.vibrate) navigator.vibrate(foi ? 60 : [60, 80, 60]);
  };
  const fila = () => { try { return JSON.parse(ler(FILA) || '[]'); } catch (e) { return []; } };
  let ultimo = 0, picos = [], ligado = false;
  async function dispara() {
    if (Date.now() - ultimo < 20000) return; ultimo = Date.now();   // um chacoalhão manda um pedido só
    const l = '- [' + stamp(new Date()) + '] 🆘 @todos chacoalhei o celular: tem algo errado aqui (tela: ' + String(onde()).replace(/[\[\]]/g, '') + (versao() ? ', app ' + versao() : '') + ')';
    const foi = await gravaLinha(l);
    if (!foi) grava(FILA, JSON.stringify(fila().concat(l).slice(-5)));
    mostra(foi); try { if (foi && window.socorroFoi) window.socorroFoi(); } catch (e) {}
  }
  async function reenvia() {
    const f = fila(); if (!f.length) return;
    const resto = []; for (const l of f) if (!(await gravaLinha(l))) resto.push(l);
    grava(FILA, resto.length ? JSON.stringify(resto) : ''); if (!resto.length) mostra(true, true);
  }
  const mov = e => {   // chacoalhão = 4 trancos fortes em pouco mais de 1 s (andar e guardar no bolso não chegam nisso)
    const a = e.accelerationIncludingGravity || e.acceleration; if (!a) return;
    const g = Math.hypot(a.x || 0, a.y || 0, a.z || 0), t = Date.now(); if (g < 24) return;
    picos = picos.filter(x => t - x < 1300); if (!picos.length || t - picos[picos.length - 1] > 110) picos.push(t);
    if (picos.length >= 4) { picos = []; dispara(); }
  };
  const liga = () => { if (!ligado) { ligado = true; addEventListener('devicemotion', mov); } };
  if (window.DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function') {   // iPhone: o sensor pede licença, e só dentro de um toque
    const pede = () => { document.removeEventListener('touchend', pede, true); DeviceMotionEvent.requestPermission().then(st => { if (st === 'granted') liga(); }).catch(() => {}); };
    document.addEventListener('touchend', pede, true);
  } else if (window.DeviceMotionEvent) liga();
  setInterval(reenvia, 60000); addEventListener('online', () => setTimeout(reenvia, 3000));
  window.Socorro = { dispara, reenvia };

  // Modo de emergência (#174, May 21:28: "e quando não abrir nada?"): só no app. Se o script principal não ficar pronto em 8 s, ou der erro antes disso,
  // abre uma tela simples por cima: a última Geral guardada no aparelho, uma caixa que manda direto pra Geral, e um aviso @todos com o erro.
  if (/(^|\/)(app\.html)?$/.test(location.pathname)) {
    let erro = '', aberto = false;
    addEventListener('error', e => { if (window.appPronto || erro) return; erro = (e.message || 'erro de script') + (e.lineno ? ' (linha ' + e.lineno + ')' : ''); setTimeout(abre, 400); });
    setTimeout(() => abre(), 8000);
    function abre() {
      if (aberto || window.appPronto || !document.body) return; aberto = true; estilo();
      const css = document.createElement('style'); css.textContent = '.emerg{position:fixed;inset:0;z-index:2147482000;display:flex;flex-direction:column;background:#0E0F12;color:#F1F2F4;font-family:system-ui,sans-serif;padding:env(safe-area-inset-top,0) 0 env(safe-area-inset-bottom,0)}.emerg .em-top{padding:16px;border-bottom:1px solid #2A2F3A;background:#16181E}.emerg .em-top b{display:block;font-size:20px}.emerg .em-top p{margin:6px 0 0;font-size:14px;color:#C5CAD3}.emerg .ms{flex:1;overflow:auto;padding:12px 16px;display:flex;flex-direction:column;gap:8px}.emerg .m{background:#1A1D24;border-radius:14px;padding:10px 12px;font-size:15px;line-height:1.35;white-space:pre-wrap;word-break:break-word}.emerg .m.ela{background:#1F3A2E;align-self:flex-end;max-width:88%}.emerg .m b{display:block;font-size:12px;color:#9AA3B2;margin-bottom:2px}.emerg .em-form{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #2A2F3A;background:#0E0F12}.emerg textarea{flex:1;font:inherit;font-size:16px;border-radius:14px;border:1px solid #2A2F3A;background:#151820;color:#fff;padding:10px 12px;resize:none}.emerg .em-form button{flex:none;width:auto;height:auto;min-height:48px;border:0;border-radius:14px;padding:0 16px;background:#22C55E;color:#04130A;font:inherit;font-weight:800;font-size:16px}.emerg .st{font-size:13px;color:#9AA3B2;padding:0 16px 8px}';
      document.head.append(css);
      const el = document.createElement('div'); el.className = 'emerg';
      el.innerHTML = '<div class="em-top"><b>Modo de emergência</b><p></p></div><div class="ms"></div><div class="st"></div><div class="em-form"><textarea rows="2" placeholder="Escreve pra gente aqui"></textarea><button type="button">Mandar</button></div>';
      el.querySelector('.em-top p').textContent = 'O app não abriu direito. Os robôs já foram avisados e vão olhar. Dá pra ler a última Geral e mandar recado por aqui.';   // o erro técnico vai só no recado pros robôs (Sigma 22:50)
      const ms = el.querySelector('.ms'), st = el.querySelector('.st'), md = ler('caixa-CAIXA-DE-ENTRADA.md');
      const linhas = md.split(/\r?\n/).filter(l => /^- \[|^\s+↳ /.test(l)).slice(-40);
      linhas.forEach(l => { const m = document.createElement('div'), ela = /^- \[/.test(l), mm = ela ? l.match(/^- \[([^\]]+)\]\s*(.*)$/) : l.match(/^\s+↳ ([^\[]+)\[([^\]]+)\]:\s*(.*)$/); if (!mm) return; m.className = 'm' + (ela ? ' ela' : ''); const b = document.createElement('b'); b.textContent = ela ? 'May · ' + mm[1] : mm[1].trim() + ' · ' + mm[2]; m.append(b, document.createTextNode(ela ? mm[2] : mm[3])); ms.append(m); });
      if (!linhas.length) ms.append(Object.assign(document.createElement('div'), { className: 'm', textContent: 'Não tem Geral guardada neste aparelho ainda. Mesmo assim, o que tu escrever aqui chega na gente.' }));
      document.body.append(el); ms.scrollTop = ms.scrollHeight;
      const ta = el.querySelector('textarea');
      el.querySelector('.em-form button').onclick = async () => { const t = ta.value.trim(); if (!t) return; st.textContent = 'Mandando…'; const l = '- [' + stamp(new Date()) + '] ' + t.replace(/\n+/g, ' ');
        if (await gravaLinha(l)) { st.textContent = 'Foi. A gente responde na Geral.'; ta.value = ''; const m = document.createElement('div'); m.className = 'm ela'; m.textContent = t; ms.append(m); ms.scrollTop = ms.scrollHeight; }
        else { st.textContent = 'NÃO foi: ' + (motivo || 'sem conexão') + '. Guardei e mando sozinho assim que der.'; grava(FILA, JSON.stringify(fila().concat(l).slice(-5))); } };
      const chave = versao() + '|' + (erro || 'não abriu em 8 s');
      if (ler('emerg-avisado') !== chave) gravaLinha('- [' + stamp(new Date()) + '] 🆘 @todos o app não abriu no celular dela e entrou no modo de emergência: ' + (erro || 'não ficou pronto em 8 s') + (versao() ? ' (app ' + versao() + ')' : '')).then(ok => { if (ok) grava('emerg-avisado', chave); });
    }
  }
})();
