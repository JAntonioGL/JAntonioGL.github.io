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
    /* LA TRANSICIÓN AHORA SE MANEJA CON JS
      para permitir el "salto" infinito.
      Eliminamos 'transition' de aquí.
    */
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
        <img class="carousel-image" src="{{ '/assets/img/4.jpeg' | relative_url }}" alt="Captura de pantalla de la app 4">
        <img class="carousel-image" src="{{ '/assets/img/5.jpeg' | relative_url }}" alt="Captura de pantalla de la app 5">
        <img class="carousel-image" src="{{ '/assets/img/6.jpeg' | relative_url }}" alt="Captura de pantalla de la app 6">
        <img class="carousel-image" src="{{ '/assets/img/7.jpeg' | relative_url }}" alt="Captura de pantalla de la app 7">
        <img class="carousel-image" src="{{ '/assets/img/8.jpeg' | relative_url }}" alt="Captura de pantalla de la app 8">
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
    const carouselContainer = document.querySelector('.hero .carousel-container');
    if (!carouselContainer) return;

    const slide = carouselContainer.querySelector('.carousel-slide');
    const prevBtn = carouselContainer.querySelector('.prev-btn');
    const nextBtn = carouselContainer.querySelector('.next-btn');
    
    // Traer todas las imágenes originales
    let images = carouselContainer.querySelectorAll('.carousel-image');
    if (images.length === 0) return;

    // --- 1. CONFIGURACIÓN DEL LOOP INFINITO ---

    // Clonar la primera y la última imagen
    const firstImageClone = images[0].cloneNode(true);
    const lastImageClone = images[images.length - 1].cloneNode(true);

    // Añadir los clones al slide
    slide.appendChild(firstImageClone);
    slide.prepend(lastImageClone);

    // Actualizar la lista de imágenes para incluir los clones
    images = carouselContainer.querySelectorAll('.carousel-image');
    const imageCount = images.length;
    
    let currentIndex = 1; // Empezamos en la primera imagen *real* (índice 1)
    let autoPlayInterval;
    let isAutoplayActive = true; // Controla si el autoplay debe estar encendido

    // Función para poner la transición CSS
    function setTransition(enable = true) {
      slide.style.transition = enable ? 'transform 0.5s ease-in-out' : 'none';
    }

    // Función para mover el slide a un índice
    function goToSlide(index, withTransition = true) {
      setTransition(withTransition);
      slide.style.transform = `translateX(-${index * 100}%)`;
      currentIndex = index;
    }

    // Posición inicial (sin transición)
    goToSlide(currentIndex, false);

    // --- 2. LÓGICA DE AUTOPLAY Y NAVEGACIÓN ---

    function startAutoplay() {
      if (!isAutoplayActive) return; // Si el usuario ya interactuó, no inicies
      
      autoPlayInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 4000); // Cambia cada 4 segundos
    }

    function stopAutoplay() {
      clearInterval(autoPlayInterval);
    }

    // Clic en Siguiente
    nextBtn.addEventListener('click', () => {
      isAutoplayActive = false; // El usuario interactuó, desactiva autoplay
      stopAutoplay();
      goToSlide(currentIndex + 1);
    });

    // Clic en Anterior
    prevBtn.addEventListener('click', () => {
      isAutoplayActive = false; // El usuario interactuó, desactiva autoplay
      stopAutoplay();
      goToSlide(currentIndex - 1);
    });

    // Pausar/Reanudar autoplay con el mouse (solo si sigue activo)
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', () => {
      if (isAutoplayActive) {
        startAutoplay();
      }
    });

    // --- 3. MANEJO DEL "SALTO" INFINITO ---
    
    // Este evento se dispara cuando la animación CSS termina
    slide.addEventListener('transitionend', () => {
      // Si estamos en el clon de la ÚLTIMA imagen (al principio)
      if (currentIndex === 0) {
        // Salta a la última imagen *real* sin animación
        goToSlide(imageCount - 2, false); 
      }
      
      // Si estamos en el clon de la PRIMERA imagen (al final)
      if (currentIndex === imageCount - 1) {
        // Salta a la primera imagen *real* sin animación
        goToSlide(1, false); 
      }
    });

    // Iniciar el carrusel automáticamente
    startAutoplay();
  });
</script>