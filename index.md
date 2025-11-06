---
layout: default
title: Inicio — YoVerifico
description: Evita multas y gestiona tu verificación vehicular en toda la Megalópolis con YoVerifico. Recibe recordatorios y mantente informado.
section: inicio
---

<style>
  .carousel-container {
    position: relative;
    width: 100%;
    max-width: 320px; /* Ancho típico de un teléfono */
    margin: 0 auto;
    overflow: hidden; /* ¡Esto es clave! Oculta las otras imágenes */
    border-radius: 20px; /* Bordes redondeados para simular un teléfono */
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
  .carousel-slide {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  .carousel-image {
    width: 100%;
    flex-shrink: 0; /* Evita que las imágenes se encojan */
    display: block;
  }
  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    z-index: 10;
    transition: background-color 0.2s;
  }
  .carousel-btn:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
  .carousel-btn.prev-btn {
    left: 10px;
  }
  .carousel-btn.next-btn {
    right: 10px;
  }
</style>

<section class="hero">
  <div>
    <h1>Tu verificación vehicular, <br>sin estrés y siempre a tiempo</h1>
    <p>YoVerifico es tu asistente personal en la Megalópolis. Te recuerda tus fechas límite, te ayuda a planear y te mantiene informado para que **nunca más se te pase la verificación y evites multas**.</p>
    <div class="cta">
      <a class="button" href="{{ "/descargas" | relative_url }}">Descargar app</a>
      <a class="button secondary" href="{{ "/faq" | relative_url }}">Cómo funciona</a>
    </div>
    <p class="muted">Disponible exclusivamente para Android en Google Play.</p>
  </div>
  <div>
    
    <div class="carousel-container">
      <div class="carousel-slide">
        <img class="carousel-image" src="{{ '/assets/img/1.jpeg' | relative_url }}" alt="Captura de pantalla de la app 1">
        <img class="carousel-image" src="{{ '/assets/img/2.jpeg' | relative_url }}" alt="Captura de pantalla de la app 2">
        <img class="carousel-image" src="{{ '/assets/img/3.jpeg' | relative_url }}" alt="Captura de pantalla de la app 3">
        <img class="carousel-image" src="{{ '/assets/img/3.jpeg' | relative_url }}" alt="Captura de pantalla de la app 4">
        <img class="carousel-image" src="{{ '/assets/img/3.jpeg' | relative_url }}" alt="Captura de pantalla de la app 5">
        <img class="carousel-image" src="{{ '/assets/img/3.jpeg' | relative_url }}" alt="Captura de pantalla de la app 6">
        <img class="carousel-image" src="{{ '/assets/img/3.jpeg' | relative_url }}" alt="Captura de pantalla de la app 7">
        <img class="carousel-image" src="{{ '/assets/img/3.jpeg' | relative_url }}" alt="Captura de pantalla de la app 8">
      </div>
      
      <button class="carousel-btn prev-btn">&lt;</button>
      <button class="carousel-btn next-btn">&gt;</button>
    </div>
    
  </div>
</section>

<section style="margin-top:2rem;">
  <div class="card-grid">
    <article class="card">
      <h3>🚀 Recordatorios Inteligentes</h3>
      <p class="muted">Programa notificaciones automáticas para tu verificación. ¡Adiós a las multas por olvido!</p>
    </article>
    <article class="card">
      <h3>🌍 Cobertura Megalópolis</h3>
      <p class="muted">Diseñada para conductores en CDMX, Edomex, Hidalgo, Morelos, Puebla, Querétaro y Tlaxcala.</p>
    </article>
    <article class="card">
      <h3>🚗 Gestión Multi-Vehículo</h3>
      <p class="muted">Administra todos tus autos en un solo lugar. Ideal para familias o pequeñas flotillas.</p>
    </article>
    <article class="card">
      <h3>✅ Información Confiable</h3>
      <p class="muted">Nuestros cálculos se basan 100% en los calendarios y programas oficiales de cada estado.</p>
    </article>
    <article class="card">
      <h3>🛡️ Privacidad Primero</h3>
      <p class="muted">Tus datos personales son tuyos. No los vendemos. Consulta nuestro Aviso de Privacidad.</p>
    </article>
    <article class="card">
      <h3>🛠️ Soporte Humano</h3>
      <p class="muted">Detrás de YoVerifico hay un desarrollador real, listo para escucharte y ayudarte.</p>
    </article>
  </div>
</section>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    // Busca el carrusel específico dentro de la sección "hero"
    const carouselContainer = document.querySelector('.hero .carousel-container');
    if (!carouselContainer) return; // Si no lo encuentra, no hace nada

    const slide = carouselContainer.querySelector('.carousel-slide');
    const images = carouselContainer.querySelectorAll('.carousel-image');
    const prevBtn = carouselContainer.querySelector('.prev-btn');
    const nextBtn = carouselContainer.querySelector('.next-btn');
    
    // Asegurarse de que todo existe antes de continuar
    if (!slide || !images.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const imageCount = images.length;
    let autoPlayInterval;

    // Función para mover el slide
    function goToSlide(index) {
      // Lógica para que el carrusel sea infinito (loop)
      if (index < 0) {
        index = imageCount - 1;
      } else if (index >= imageCount) {
        index = 0;
      }
      
      // Mueve el contenedor de imágenes usando 'transform'
      slide.style.transform = `translateX(-${index * 100}%)`;
      currentIndex = index;
    }

    // Función para iniciar el autoplay
    function startAutoplay() {
      // Cambia de imagen cada 4 segundos (4000 milisegundos)
      autoPlayInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 4000);
    }

    // Función para detener el autoplay
    function stopAutoplay() {
      clearInterval(autoPlayInterval);
    }

    // --- Event Listeners ---

    // Clic en Siguiente
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      stopAutoplay(); // Detiene el autoplay al hacer clic manual
      startAutoplay(); // Lo reinicia
    });

    // Clic en Anterior
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      stopAutoplay(); // Detiene el autoplay
      startAutoplay(); // Lo reinicia
    });

    // Detener autoplay si el mouse está sobre el carrusel
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    // Reanudar autoplay cuando el mouse sale
    carouselContainer.addEventListener('mouseleave', startAutoplay);

    // Iniciar el carrusel automáticamente
    startAutoplay();
  });
</script>