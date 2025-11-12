---
layout: default
title: Descargas — YoVerifico
description: Descarga la app oficial de YoVerifico para Android. Evita multas y gestiona tu verificación vehicular.
section: descargas
permalink: /descargas
---

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const androidUrl = "https://play.google.com/store/apps/details?id=com.yoverifico.app";

    // Si es Android → redirige automáticamente
    if (/android/i.test(userAgent)) {
      window.location.href = androidUrl;
    }
  });
</script>

# Descarga YoVerifico

¡Estás a un paso de tener el control total de tu verificación vehicular!

Descarga la aplicación oficial y más reciente de YoVerifico. Es la única forma de asegurarte de recibir todas las actualizaciones, nuevas funciones y los recordatorios a tiempo.

<div class="card-grid" style="margin-top: 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; max-width: 900px; margin-left: auto; margin-right: auto;">

  <!-- Android -->
  <div class="card" style="padding: 2rem;">
    <h3 style="text-align: center;">Disponible para Android</h3>
    <p class="muted" style="text-align: center;">Haz clic en el botón para ir directamente a la tienda oficial de Google Play.</p>

    <div style="text-align: center; margin: 1.5rem 0;">
      <a href="https://play.google.com/store/apps/details?id=com.yoverifico.app" target="_blank" rel="noopener noreferrer">
        <img src="https://play.google.com/intl/en_us/badges/static/images/badges/es-419_badge_web_generic.png"
             alt="Descárgalo en Google Play"
             style="width: 100%; max-width: 250px;">
      </a>
    </div>

    <p class="muted" style="font-size: 0.9rem; text-align: center; margin-top: 1rem;">
      <strong>Aviso de seguridad:</strong> No ofrecemos archivos <code>.apk</code> ni betas públicas en otros sitios.<br>
      La Google Play Store es nuestro único canal oficial de descarga.
    </p>
  </div>

  <!-- iOS -->
  <div class="card" style="padding: 2rem; opacity: 0.8;">
    <h3 style="text-align: center;">Próximamente en iOS</h3>
    <p class="muted" style="text-align: center;">Disponible próximamente en App Store para iPhone y iPad.</p>

    <div style="text-align: center; margin: 1.5rem 0;">
      <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
           alt="Disponible en App Store próximamente"
           style="width: 100%; max-width: 220px; opacity: 0.6;">
    </div>

    <p class="muted" style="font-size: 0.9rem; text-align: center;">
      Actualmente disponible solo para Android.  
      ¡Estamos trabajando para llegar pronto a iOS!
    </p>
  </div>

</div>

<style>
  @media (max-width: 768px) {
    .card-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
