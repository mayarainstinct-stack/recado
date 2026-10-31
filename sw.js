// v3 (hora nas respostas; foto no push). Service worker dos Recados: só serve pra notificação push (iPhone com a página na tela de início, iOS 16.4+).
self.addEventListener('install', () => self.skipWaiting());
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
  const conv = (e.notification.data && e.notification.data.conv) || '', foto = (e.notification.data && e.notification.data.foto) || '';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) { if ('focus' in c) { c.postMessage({ responder: conv, foto }); return c.focus(); } }
    return self.clients.openWindow('./#responder=' + encodeURIComponent(conv) + (foto ? '&foto=' + encodeURIComponent(foto) : ''));
  }));
});
