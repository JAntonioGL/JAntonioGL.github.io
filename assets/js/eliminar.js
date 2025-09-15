// Reemplaza con tus IDs de EmailJS
const EMAILJS_SERVICE_ID = "service_3436d6u";     
const EMAILJS_TEMPLATE_ID = "template_879jufv";    
const EMAILJS_PUBLIC_KEY = "BbD68xU7dIdPr-Ruu";    

(function(){
  if(!window.emailjs){
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
    s.defer = true;
    s.onload = () => emailjs.init(EMAILJS_PUBLIC_KEY);
    document.head.appendChild(s);
  } else {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
})();

function genTicket(){
  const d = new Date();
  const pad = n => String(n).padStart(2,'0');
  return `YV-${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}-${Math.random().toString(36).slice(2,5).toUpperCase()}`;
}

function setEstado(msg, ok){
  const estado = document.getElementById('estado');
  if(!estado) return;
  estado.textContent = msg || '';
  estado.style.color = ok ? '#0f766e' : '#b91c1c';
}

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formEliminar');
  if(!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if(document.getElementById('empresa').value.trim() !== ''){
      setEstado('Error de validación.', false);
      return;
    }
    if(!document.getElementById('email').value || !document.getElementById('consent').checked){
      setEstado('Completa los campos obligatorios.', false);
      return;
    }

    const data = {
      email: document.getElementById('email').value.trim(),
      nombre: document.getElementById('nombre').value.trim(),
      motivo: document.getElementById('motivo').value.trim(),
      consent: 'Sí',
      ticket: genTicket(),
      user_agent: navigator.userAgent,
      page_url: location.href,
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ACK, data);
      setEstado(`Solicitud enviada. Ticket: ${data.ticket}`, true);
      form.reset();
    } catch (err) {
      console.error(err);
      setEstado('No se pudo enviar la solicitud. Intenta de nuevo.', false);
    }
  });
});
