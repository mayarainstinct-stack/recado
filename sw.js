// Service worker dos Recados: só serve pra notificação push (iPhone com a página na tela de início, iOS 16.4+).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Recados', {
    body: d.body || 'Chegou recado novo',
    icon: 'apple-touch-icon.png',
    badge: 'favicon.png',
    tag: 'recados',
    renotify: true
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  // Tocou na notificação: abre (ou traz pra frente) já no modo de responder a última mensagem.
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) { if ('focus' in c) { c.postMessage('responder'); return c.focus(); } }
    return self.clients.openWindow('./#responder');
  }));
});
