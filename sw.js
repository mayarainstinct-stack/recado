// v48 (Pasta cinza mostra os 3 laudos como imagem: abre em tela cheia, desliza e salva, funciona sem internet depois da 1a vez, app .265, 11/11/2026). v47 (anel da semana aparece com 0 e enche animado; agenda do trabalho com contadores e botao de impedimentos, app .264, 10/11/2026). v46 (abas numa linha e troca com o dedo, nada retraido na Saude, busca na Pasta cinza, Autocuidado zera por dia/semana, app .263, 10/11/2026). v45 (Relatos em slides, Dicas em cartoes que viram, Preparo em trilha, app .262, 10/11/2026). v44 (Saude so em rosa: estilos de destaque por pasta, icone do topo branco, app .261, 10/11/2026). v43 (Saude em telas visuais: abas, cartoes, linha do tempo, cor e desenho proprios por pasta, Pasta cinza em cinza, app .260, 10/11/2026). v42 (texto dos .md formatado: tabela, link, italico, lista numerada; lista marcavel sem quebrar em colunas, app .259, 10/11/2026). v41 (tela Exames visual: cartoes, barras e abas, app .258, 10/11/2026). v40 (folgas na config: dia sem Trabalho, app .257, 10/11/2026). v39 (resposta embaixo da pergunta, app .256, 10/11/2026). v38 (renova a copia sem internet a cada 15 min, app .255, 10/11/2026). v37 (sem internet tambem Agenda, Checklist e Planos, app .254, 10/11/2026). v36 (medio mais leve, app .253, 10/11/2026). v35 (contas da viagem, app .252, 10/11/2026). v34 (app abre sem internet com a ultima versao guardada, app .251, 10/11/2026). v33 (deslize da borda volta 1 tela so, app .251, 10/11/2026). v32 (filtros no submenu: na ordem, faltando, A-Z, app .250, 10/11/2026). v31 (pastas dos grupos arrastaveis, app .249, 10/11/2026). v30 (submenu antes das listas com 4 grupos ou mais, app .248, 10/11/2026). v29 (acao na tela antes do envio, volta se falhar, app .247, 10/11/2026). v28 (agenda no layout do PDF com Exportar, cor por assunto na agenda pessoal, app .246, 09/11/2026). v27 (treino por dia da semana, app .245, 09/11/2026). v26 (Mural da academia, treino unico, editor em Maquinas, Garagem, Casa, Obra, Midia, Musica e Atelie, microfone iPhone, app .244, 09/11/2026). v25 (esqueleto de carregamento, Projetos refeito, Rotina editavel, fila de lembretes pelo lembretes.json, app .243, 09/11/2026). v24 (Saude em JSON editavel, Agenda le agenda.json, toque duplo, feito no JSON, app .242, 09/11/2026). v23 (Financas editavel, Configuracoes em abas, popup de pergunta, app .241, 09/11/2026). v22 (editor unico, Configuracoes, Planos, Artes e Musica, app .240, 09/11/2026). v21 (Garagem: rolagem vertical lisa, slider so na alca, app .239, 09/11/2026). v20 (voltar só na barra de cima, planta inteira, app .238, 09/11/2026). v19 (Garagem: vetor no elevador, aba Manutenção e + de lançamentos, app .236, 09/11/2026). v18 (Garagem: 3 fases, slider, Tunar e Diário, app .235, 09/11/2026). v17 (lembrete em fila, app .234, 09/11/2026). // v16 (lembrete em popup, 09/11/2026). v15 (app .224: Menu do trabalho, 09/11/2026). v14 (cache das imagens estáticas: avatares, ícones, fontes e marca ficam no celular depois da 1ª vez, até 300 arquivos; app.html e dados continuam sem cache). v13 (tocar na notificação navega a janela pra ./#responder=... em vez de postMessage: o hash sobrevive ao reload). v12..v3 no histórico do git. Service worker dos Recados: só serve pra notificação push (iPhone com a página na tela de início, iOS 16.4+). Sem cache do app.html de propósito.
const PAGINAS_BASE = ['./', 'index.html', 'app.html', 'socorro.js', 'garagem.js', 'manifest.json'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open('recados-paginas-v1').then(c => Promise.all(PAGINAS_BASE.map(n => { const u = new URL(n, self.registration.scope); return fetch(u, { cache: 'no-cache' }).then(r => r.ok && c.put(u.origin + u.pathname, r)).catch(() => {}); })))); });   // já guarda a página na instalação: a 1ª abertura sem rede funciona
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
const CACHE_ESTATICO = 'recados-estatico-v1', MAX_ESTATICO = 300;
const CACHE_PAGINAS = 'recados-paginas-v1';
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  // Página do app sem internet (May, 10/11/2026: "salva o cache da última vez que entrou"): index, app.html e os .js do site vão
  // pela rede primeiro e a cópia fica guardada; sem rede, abre a última que deu certo
  if (e.request.method === 'GET' && u.origin === self.location.origin && (e.request.mode === 'navigate' || /(\/|\.html|\.js|manifest\.json)$/i.test(u.pathname)) && !/sw\.js$/i.test(u.pathname)) {
    const chave = u.origin + u.pathname;
    e.respondWith(fetch(e.request).then(r => { if (r.ok) { const cp = r.clone(); caches.open(CACHE_PAGINAS).then(c => c.put(chave, cp)); } return r; })
      .catch(() => caches.open(CACHE_PAGINAS).then(c => c.match(chave)).then(r => r || Response.error())));
    return;
  }
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
