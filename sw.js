/* Service worker · Viaje 2027 — cachea la app para usarla sin internet.
   HTML: network-first (con internet trae siempre la última versión; sin
   internet usa la copia guardada). Resto de assets: cache-first. */
const CACHE = "viaje2027-v7";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-180.png",
  "./icon-192-maskable.png",
  "./icon-512-maskable.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }

  // El HTML de la app va por red primero, así los cambios se ven apenas se publican.
  const isHTML = req.mode === "navigate" ||
    (url.origin === location.origin && (url.pathname.endsWith("/") || url.pathname.endsWith("/index.html")));
  if (isHTML) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(req).then(h => h || caches.match("./index.html")))
    );
    return;
  }

  // Resto (iconos, fuentes, etc.): caché primero y se guarda al vuelo.
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      try {
        if (url.origin === location.origin || url.host.includes("gstatic") || url.host.includes("googleapis")) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
      } catch (_) {}
      return res;
    }).catch(() => caches.match("./index.html")))
  );
});
