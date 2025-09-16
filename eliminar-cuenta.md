---
layout: default
title: Eliminar cuenta — YoVerifico
description: Solicita la eliminación de tu cuenta y datos personales de YoVerifico.
section: eliminar
permalink: /eliminar-cuenta
---

<style>
  .hide { display: none !important; }
  /* (Opcional) pequeños estilos para el demo */
  .ok{color:#0f766e}.err{color:#b91c1c}
</style>

<main class="container" style="max-width:760px">
  <h1>Eliminar cuenta y datos</h1>
  <p class="muted">Plazo de atención: <strong>hasta 60 días hábiles</strong>. Por seguridad, verificaremos tu identidad con un código (OTP) y una confirmación escrita.</p>

  <!-- Paso 1: correo -->
  <section id="step1" class="card">
    <h2 style="margin-top:0">Paso 1 — Verifica tu correo</h2>
    <div class="field">
      <label for="email">Correo registrado <span style="color:red">*</span></label>
      <input id="email" type="email" placeholder="tu@correo.com" autocomplete="email" required />
    </div>
    <div class="actions">
      <button id="btnStep1">Continuar</button>
      <span id="status1" role="status" aria-live="polite"></span>
    </div>
    <p class="helper">Si no tienes acceso a este correo, escribe a <a href="mailto:soporte@yoverifico.com.mx">soporte@yoverifico.com.mx</a>.</p>
  </section>

  <!-- Paso 2: enviar OTP -->
  <section id="step2" class="card hide">
    <h2 style="margin-top:0">Paso 2 — Solicita tu código</h2>
    <p class="muted">Enviaremos un código (OTP) a tu correo.</p>
    <div class="actions">
      <button id="btnStep2">Enviar código</button>
      <span id="status2" role="status" aria-live="polite"></span>
    </div>
  </section>

  <!-- Paso 3: validar OTP -->
  <section id="step3" class="card hide">
    <h2 style="margin-top:0">Paso 3 — Verifica el código</h2>
    <div class="field">
      <label for="otp">Código recibido (OTP) <span style="color:red">*</span></label>
      <input id="otp" type="text" inputmode="numeric" placeholder="Ingresa el código" />
    </div>
    <div class="actions">
      <button id="btnStep3">Validar código</button>
      <span id="status3" role="status" aria-live="polite"></span>
    </div>
  </section>

  <!-- Paso 4: confirmación escrita -->
  <section id="step4" class="card hide">
    <h2 style="margin-top:0">Paso 4 — Confirmación final</h2>
    <p>Escribe exactamente la siguiente frase para confirmar:</p>
    <p class="helper" id="confirmPhrasePreview" style="background:#F1F5F9;border:1px solid #E5E7EB;padding:8px;border-radius:8px"></p>

    <div class="field">
      <label for="confirmPhrase">Frase de confirmación <span style="color:red">*</span></label>
      <input id="confirmPhrase" type="text" placeholder="Escribe la frase exacta" />
    </div>

    <div class="field">
      <input id="consent" type="checkbox" />
      <label for="consent">Confirmo que deseo eliminar de forma permanente mi cuenta y datos asociados.</label>
    </div>

    <div class="actions">
      <button id="btnStep4">Confirmar eliminación</button>
      <span id="status4" role="status" aria-live="polite"></span>
    </div>
  </section>

  <!-- Final -->
  <section id="done" class="card hide">
    <h2 style="margin-top:0">Listo</h2>
    <p class="ok"><strong>Tu cuenta ha sido eliminada satisfactoriamente.</strong></p>
    <p class="legal">
      Conservaremos registros mínimos y desasociados por motivos de seguridad/cumplimiento, conforme a nuestro
      <a href="/politicas-privacidad">Aviso de Privacidad</a>. Si requieres soporte adicional, escribe a
      <a href="mailto:soporte@yoverifico.com.mx">soporte@yoverifico.com.mx</a>.
    </p>
  </section>

  <section class="card">
    <h3 style="margin-top:0">Política de eliminación y privacidad</h3>
    <ul>
      <li><strong>Plazo:</strong> hasta <strong>60 días hábiles</strong> desde la verificación de identidad.</li>
      <li><strong>Retención limitada:</strong> solo registros mínimos y desasociados por seguridad/cumplimiento.</li>
      <li><strong>Excepciones:</strong> si hay investigación/disputa/requerimiento legal, se difiere y se notifica.</li>
      <li><strong>Privacidad:</strong> rige el <a href="/politicas-privacidad">Aviso de Privacidad</a>.</li>
      <li><strong>ARCO y soporte:</strong> <a href="mailto:soporte@yoverifico.com.mx">soporte@yoverifico.com.mx</a>.</li>
    </ul>
    <p class="helper">Este sitio está protegido por reCAPTCHA; aplican la
      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Política de privacidad</a> y los
      <a href="https://policies.google.com/terms" target="_blank" rel="noopener">Términos del servicio</a> de Google.</p>
  </section>
</main>

<!-- reCAPTCHA v3 -->
<script src="https://www.google.com/recaptcha/api.js?render=TU_SITE_KEY"></script>

<script>
(function(){
  const API_BASE = 'https://api.yoverifico.com.mx';
  const SITE_KEY = 'TU_SITE_KEY';
  const $ = s => document.querySelector(s);
  const show = (s,on=true)=>{const n=$(s); if(n) n.classList.toggle('hide', !on);};
  const disable = (s,on=true)=>{const n=$(s); if(n) n.disabled=on;};
  const txt = (s,m,ok)=>{const n=$(s); if(!n) return; n.textContent=m||''; n.className = ok===undefined ? '' : (ok?'ok':'err');};
  const scrollTo = (s)=>{ const n=$(s); if(n) n.scrollIntoView({behavior:'smooth', block:'start'}); };

  let emailCache='', ticketCache='';
  const phraseFor = (e)=>`Confirmo que deseo eliminar la cuenta ${e}`;
  const updatePhrasePreview=()=>{$('#confirmPhrasePreview').textContent=phraseFor(emailCache);};

  function v3(action){
    return new Promise((res,rej)=>{
      if(!window.grecaptcha) return rej(new Error('reCAPTCHA no cargó'));
      grecaptcha.ready(()=>grecaptcha.execute(SITE_KEY,{action}).then(res).catch(rej));
    });
  }

  // Paso 1 — existe-correo
  $('#btnStep1').addEventListener('click', async ()=>{
    const email = $('#email').value.trim();
    if(!email){ txt('#status1','Ingresa tu correo.', false); return; }
    disable('#btnStep1', true); txt('#status1','Verificando…', true);
    try{
      const captcha = await v3('existe_correo');
      const resp = await fetch(`${API_BASE}/api/auth/existe-correo`,{
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email, captcha })
      });
      const data = await resp.json().catch(()=>({}));
      if(!resp.ok){
        if(resp.status===404 || data.exists===false){
          txt('#status1','No existe un usuario registrado con ese correo.', false);
          return;
        }
        throw new Error(data.message || 'Error al verificar');
      }
      if(data.exists===false){
        txt('#status1','No existe un usuario registrado con ese correo.', false);
        return;
      }
      emailCache = email; updatePhrasePreview();
      txt('#status1','Correo verificado.', true);
      show('#step2', true); show('#step1', false);  // ← oculta Paso 1
      scrollTo('#step2');
    }catch(e){ txt('#status1', e.message || 'No se pudo verificar.', false); }
    finally{ disable('#btnStep1', false); }
  });

  // Paso 2 — solicitar OTP
  $('#btnStep2').addEventListener('click', async ()=>{
    if(!emailCache){ txt('#status2','Ingresa tu correo primero.', false); return; }
    disable('#btnStep2', true); txt('#status2','Enviando código…', true);
    try{
      const captcha = await v3('otp_request');
      const resp = await fetch(`${API_BASE}/api/usuario/account/delete/otp/request`,{
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email: emailCache, captcha })
      });
      const data = await resp.json().catch(()=>({}));
      if(!resp.ok){ throw new Error(data.message || 'Error al solicitar código'); }
      txt('#status2','Código enviado. Revisa tu bandeja.', true);
      show('#step3', true); show('#step2', false);  // ← oculta Paso 2
      scrollTo('#step3');
    }catch(e){ txt('#status2', e.message || 'No se pudo enviar el código.', false); }
    finally{ disable('#btnStep2', false); }
  });

  // Paso 3 — verificar OTP
  $('#btnStep3').addEventListener('click', async ()=>{
    const otp = $('#otp').value.trim();
    if(!otp){ txt('#status3','Ingresa el código OTP.', false); return; }
    disable('#btnStep3', true); txt('#status3','Validando código…', true);
    try{
      const captcha = await v3('otp_verify');
      const resp = await fetch(`${API_BASE}/api/usuario/account/delete/otp/verify`,{
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email: emailCache, otp, captcha })
      });
      const data = await resp.json().catch(()=>({}));
      if(!resp.ok){ throw new Error(data.message || 'Código inválido o expirado'); }
      ticketCache = data.ticket || (data.result && data.result.ticket) || '';
      if(!ticketCache) throw new Error('No se recibió ticket');
      txt('#status3','Código verificado.', true);
      show('#step4', true); show('#step3', false);  // ← oculta Paso 3
      scrollTo('#step4');
    }catch(e){ txt('#status3', e.message || 'No se pudo verificar el código.', false); }
    finally{ disable('#btnStep3', false); }
  });

  // Paso 4 — confirmación final
  $('#btnStep4').addEventListener('click', async ()=>{
    const must = phraseFor(emailCache);
    const phrase = $('#confirmPhrase').value.trim();
    if(phrase !== must){ txt('#status4','La frase no coincide exactamente.', false); return; }
    if(!$('#consent').checked){ txt('#status4','Debes marcar el consentimiento.', false); return; }
    if(!ticketCache){ txt('#status4','No hay ticket válido.', false); return; }
    disable('#btnStep4', true); txt('#status4','Confirmando…', true);
    try{
      const captcha = await v3('delete_confirm');
      const resp = await fetch(`${API_BASE}/api/usuario/account/delete/confirm`,{
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ ticket: ticketCache, captcha })
      });
      const data = await resp.json().catch(()=>({}));
      if(!resp.ok){ throw new Error(data.message || 'Error al confirmar'); }
      // Pantalla final
      show('#step1', false); show('#step2', false); show('#step3', false); show('#step4', false);
      show('#done', true);
      scrollTo('#done');
    }catch(e){ txt('#status4', e.message || 'No se pudo confirmar la solicitud.', false); }
    finally{ disable('#btnStep4', false); }
  });
})();
</script>
