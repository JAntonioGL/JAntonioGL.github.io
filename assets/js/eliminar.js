// Reemplaza con tus IDs de EmailJS
const EMAILJS_SERVICE_ID = "service_3436d6u";     
const EMAILJS_TEMPLATE_ID = "template_879jufv";    
const EMAILJS_PUBLIC_KEY = "BbD68xU7dIdPr-Ruu";    

function setEstado(msg, ok){
const el = document.getElementById('estado');
if(!el) return;
el.textContent = msg || '';
el.style.color = ok ? '#0f766e' : '#b91c1c';
}


function disableForm(disabled){
const btn = document.getElementById('btnEnviar');
if(btn) btn.disabled = disabled;
}


window.addEventListener('DOMContentLoaded', () => {
const form = document.getElementById('formEliminar');
if(!form) return;


form.addEventListener('submit', async (e) => {
e.preventDefault();


// Honeypot
if(document.getElementById('empresa').value.trim() !== ''){
setEstado('Error de validación.', false);
return;
}


const email = document.getElementById('email').value.trim();
const consent = document.getElementById('consent').checked;
if(!email || !consent){
setEstado('Completa los campos obligatorios.', false);
return;
}


const data = {
email,
nombre: (document.getElementById('nombre').value || '').trim(),
motivo: (document.getElementById('motivo').value || '').trim(),
consent: 'Sí',
ticket: genTicket(),
user_agent: navigator.userAgent,
page_url: location.href,
};


disableForm(true);
setEstado('Enviando solicitud…', true);


try {
// Espera SDK
const ensure = () => new Promise(res => {
if(window.emailjs) return res();
const i = setInterval(() => { if(window.emailjs){ clearInterval(i); res(); } }, 100);
});
await ensure();


const resp = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);
if(resp && (resp.status === 200 || resp.text === 'OK')){
setEstado(`Solicitud enviada. Ticket: ${data.ticket}`, true);
form.reset();
} else {
throw new Error('No se pudo enviar.');
}
} catch (err){
console.error(err);
setEstado('No se pudo enviar la solicitud. Intenta de nuevo.', false);
} finally {
disableForm(false);
}
});
});