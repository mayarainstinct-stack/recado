// v30 (submenu antes das listas com 4 grupos ou mais, app .248, 10/11/2026). v29 (acao na tela antes do envio, volta se falhar, app .247, 10/11/2026). v28 (agenda no layout do PDF com Exportar, cor por assunto na agenda pessoal, app .246, 09/11/2026). v27 (treino por dia da semana, app .245, 09/11/2026). v26 (Mural da academia, treino unico, editor em Maquinas, Garagem, Casa, Obra, Midia, Musica e Atelie, microfone iPhone, app .244, 09/11/2026). v25 (esqueleto de carregamento, Projetos refeito, Rotina editavel, fila de lembretes pelo lembretes.json, app .243, 09/11/2026). v24 (Saude em JSON editavel, Agenda le agenda.json, toque duplo, feito no JSON, app .242, 09/11/2026). v23 (Financas editavel, Configuracoes em abas, popup de pergunta, app .241, 09/11/2026). v22 (editor unico, Configuracoes, Planos, Artes e Musica, app .240, 09/11/2026). v21 (Garagem: rolagem vertical lisa, slider so na alca, app .239, 09/11/2026). v20 (voltar só na barra de cima, planta inteira, app .238, 09/11/2026). v19 (Garagem: vetor no elevador, aba Manutenção e + de lançamentos, app .236, 09/11/2026). v18 (Garagem: 3 fases, slider, Tunar e Diário, app .235, 09/11/2026). v17 (lembrete em fila, app .234, 09/11/2026). // v16 (lembrete em popup, 09/11/2026). v15 (app .224: Menu do trabalho, 09/11/2026). v14 (cache das imagens estáticas: avatares, ícones, fontes e marca ficam no celular depois da 1ª vez, até 300 arquivos; app.html e dados continuam sem cache). v13 (tocar na notificação navega a janela pra ./#responder=... em vez de postMessage: o hash sobrevive ao reload). v12..v3 no histórico do git. Service worker dos Recados: só serve pra notificação push (iPhone com a página na tela de início, iOS 16.4+). Sem cache do app.html de propósito.
self.addEventListener('install', () => self.skipWaiting());
const CACHE_ESTATICO = 'recados-estatico-v1', MAX_ESTATICO = 300;
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== self.location.origin || !/\/(avatares|fontes|marca)\/|\.(png|jpe?g|webp|gif|svg|ttf|woff2?)$/i.test(u.pathname)) return;   // só imagem e fonte do próprio site
  e.respondWith(caches.open(CACHE_ESTATICO).then(async c => {
    const salvo = await c.match(e.request);
    if (salvo) return salvo;   // cache-first: a 2ª vez abre na hora, até sem internet
    const r = await fetch(e.request);
    if (r.ok) { c.put(e.request, r.clone()); c.keys().then(ks => { if (ks.length > MAX_ESTATICO) ks.slice(0, ks.length - MAX_ESTATICO).forEach(k => c.delete(k)); }); }
    return r;
  }).catch(() => fetch(e.request)));
});
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { body: e.data ? e.data.text() : '' }; }
  // avisa as páginas abertas pra buscarem a mensagem nova na hora + mostra a notificação -- as duas
  // dentro do MESMO waitUntil, senão o navegador pode matar o service worker antes do postMessage
  // sair (ele só garante vida pro que está dentro do waitUntil) e o app aberto não busca o recado na hora
  e.waitUntil(Promise.all([
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => cs.forEach(c => c.postMessage('novo'))),
    self.registration.showNotification(d.title || 'Recados', {
      body: d.body || 'Chegou recado novo',
      icon: 'apple-touch-icon.png',
      badge: 'favicon.png',
      tag: 'recados-' + (d.conv || 'geral'),
      data: { conv: d.conv || '', foto: d.foto || '' },
      renotify: true
    })
  ]));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  // Tocou na notificação: abre (ou traz pra frente) a conversa certa (Geral ou Trabalho) já no modo de responder.
  // O pedido vai no endereço (#responder=...), não em postMessage: se a página recarregar no meio, o hash continua lá.
  const conv = (e.notification.data && e.notification.data.conv) || '', foto = (e.notification.data && e.notification.data.foto) || '';
  const lem = (e.notification.data && e.notification.data.lembrete) || '';   // lembrete em popup (09/11/2026): abre o app na janela Sim · Não · Ver
  const url = lem ? './#lembrete=' + encodeURIComponent(lem) : './#responder=' + encodeURIComponent(conv) + (foto ? '&foto=' + encodeURIComponent(foto) : '');
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(async cs => {
    for (const c of cs) {
      if (!('focus' in c)) continue;
      try { await c.focus(); } catch (err) {}
      // navigate só vale pra janela controlada por este sw; sem ele (ou se falhar) fica o postMessage de antes
      if ('navigate' in c) { try { if (await c.navigate(url)) return; } catch (err) {} }
      c.postMessage({ responder: conv, foto }); return;
    }
    return self.clients.openWindow(url);
  }));
});
