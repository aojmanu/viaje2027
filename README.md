# Viaje 2027 — App (PWA offline)

App instalable del viaje familiar a Europa (ene–feb 2027). Funciona **sin internet** una vez abierta y se instala en el celular con ícono propio.

## Archivos
- `index.html` — la app
- `manifest.webmanifest` — datos de instalación (nombre, íconos, color)
- `sw.js` — service worker (modo offline)
- `icon-*.png` — íconos de la app

## Subir a GitHub Pages
1. Crear un repo nuevo (ej. `viaje2027`) y subir **todos** estos archivos a la raíz.
2. En el repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`. Guardar.
3. En 1–2 min queda en `https://TU-USUARIO.github.io/viaje2027/`.

> Importante: GitHub Pages sirve por HTTPS, que es lo que necesita el modo offline. No hace falta configurar nada más.

## Instalar en el celular
- **iPhone (Safari):** abrir la URL → botón Compartir → **Agregar a inicio**.
- **Android (Chrome):** abrir la URL → menú ⋮ → **Instalar app** / **Agregar a pantalla principal**.

## Datos
Lo que marcás (reservas confirmadas, gastos saldados, cambios en la agenda) se guarda **en ese teléfono** (almacenamiento local del navegador). No se sincroniza entre dispositivos: cada equipo tiene su copia.

## Actualizar
Si cambia el itinerario, se reemplaza `index.html` y se sube de nuevo. Para forzar la actualización offline, subir `sw.js` cambiando `viaje2027-v1` por `viaje2027-v2`.
