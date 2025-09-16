---
layout: default
title: Eliminar cuenta — YoVerifico
description: Solicita la eliminación de tu cuenta y datos personales de YoVerifico.
section: eliminar
permalink: /eliminar-cuenta
---

<style>
  .hide { display: none !important; }
  .ok{color:#0f766e}.err{color:#b91c1c}
</style>

<main class="container" style="max-width:760px">
  <h1>Eliminar cuenta y datos</h1>
  <p class="muted">Plazo de atención: <strong>hasta 60 días hábiles</strong>. Por seguridad, verificaremos tu identidad con un código (OTP) y una confirmación escrita.</p>

  <!-- 1) EXISTE CORREO -->
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
  </section>

  <!-- 2) OTP -->
  <section id="step2" class="card hide">
    <h2 style="margin-top:0">Paso 2 — Verifica el código</h2>
    <p class="muted">Enviamos un código (OTP) a tu correo. Revisa tu bandeja.</p>
    <div class="field">
      <label for="otp">Código recibido (OTP) <span style="color:red">*</span></label>
      <input id="otp" type="text" inputmode="numeric" placeholder="Ingresa el código" />
    </div>
    <div class="actions">
      <button id="btnStep2">Validar código</button>
      <span id="status2" role="status" aria-live="polite"></span>
    </div>
  </section>

  <!-- 3) CONFIRMACIÓN -->
  <section id="step3" class="card hide">
    <h2 style="margin-top:0">Paso 3 — Confirmación final</h2>
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
      <button id="btnStep3">Confirmar eliminación</button>
      <span id="status3" role="status" aria-live="polite"></span>
    </div>
  </section>

  <!-- DONE -->
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

<script src="https://www.google.com/recaptcha/api.js?render=6LcvdqUrAAAAAPBzAezZd6KpGqdEPzYdmB02GWpl"></script>
<script>
(function(){
  const API_BASE = 'https://api.yoverifico.com.mx';
  const SITE_KEY = '6LcvdqUrAAAAAPBzAezZd6KpGqdEPzYdmB02GWpl';
  const $ = s => document.querySelector(s);
  const show = (s,on=true)=>{const n=$(s); if(n) n.classList.toggle('hide', !on);};
  const disable = (s,on=true)=>{const n=$(s); if(n) n.disabled=on;};
  const txt = (s,m,ok)=>{const n=$(s); if(!n) return; n.textContent=m||''; n.className = ok===undefined ? '' : (ok?'ok':'err');};
  const scrollTo = (s)=>{ const n=$(s); if(n) n.scrollIntoView({behavior:'smooth', block:'start'}); };

  let correoCache='', ticketCache='';
  const phraseFor = (e)=>`Confirmo que deseo eliminar la cuenta ${e}`;
  const updatePhrasePreview=()=>{$('#confirmPhrasePreview').textContent=phraseFor(correoCache);};

  function v3(action){
    return new Promise((res,rej)=>{
      if(!window.grecaptcha) return rej(new Error('reCAPTCHA no cargó'));
      grecaptcha.ready(()=>grecaptcha.execute(SITE_KEY,{action}).then(res).catch(rej));
    });
  }

  // 1) EXISTE CORREO
  $('#btnStep1').addEventListener('click', async ()=>{
    const correo = $('#email').value.trim();
    if(!correo){ txt('#status1','Ingresa tu correo.', false); return; }
    disable('#btnStep1', true); txt('#status1','Verificando correo…', true);
    try{
      const captchaToken = await v3('existe_correo');
      const r1 = await fetch(`${API_BASE}/api/auth/existe-correo`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ correo, captchaToken })
      });
      const d1 = await r1.json().catch(()=>({}));
      // Considera ambos casos: 404 o {exists:false}
      if(!r1.ok || d1.existe === false){
        txt('#status1','No existe un usuario registrado con ese correo.', false);
        return;
      }
      // Si existe, ahora pide OTP
      txt('#status1','Enviando código…', true);
      const captcha2 = await v3('otp_request');
      const r2 = await fetch(`${API_BASE}/api/usuario/account/delete/otp/request`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ correo, captchaToken: captcha2 })
      });
      const d2 = await r2.json().catch(()=>({}));
      if(!r2.ok || d2.ok === false){
        throw new Error(d2.message || 'No se pudo enviar el código.');
      }

      correoCache = correo; updatePhrasePreview();
      txt('#status1','Código enviado. Revisa tu bandeja.', true);
      show('#step2', true); show('#step1', false); scrollTo('#step2');
    }catch(e){
      console.error('Paso1', e);
      txt('#status1', e.message || 'No se pudo procesar tu solicitud.', false);
    }finally{
      disable('#btnStep1', false);
    }
  });

  // 2) OTP VERIFY
  $('#btnStep2').addEventListener('click', async ()=>{
    const codigo = $('#otp').value.trim();
    if(!codigo){ txt('#status2','Ingresa el código OTP.', false); return; }
    disable('#btnStep2', true); txt('#status2','Validando código…', true);
    try{
      const captchaToken = await v3('otp_verify');
      const resp = await fetch(`${API_BASE}/api/usuario/account/delete/otp/verify`,{
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ correo: correoCache, codigo, captchaToken })
      });
      const data = await resp.json().catch(()=>({}));
      if(!resp.ok || !data.ticket){ throw new Error(data.message || 'Código inválido o expirado'); }
      ticketCache = data.ticket;
      txt('#status2','Código verificado.', true);
      show('#step3', true); show('#step2', false); scrollTo('#step3');
    }catch(e){
      console.error('Paso2', e);
      txt('#status2', e.message || 'No se pudo verificar el código.', false);
    }finally{
      disable('#btnStep2', false);
    }
  });

  // 3) CONFIRM
  $('#btnStep3').addEventListener('click', async ()=>{
    const must = phraseFor(correoCache);
    const phrase = $('#confirmPhrase').value.trim();
    if(phrase !== must){ txt('#status3','La frase no coincide exactamente.', false); return; }
    if(!$('#consent').checked){ txt('#status3','Debes marcar el consentimiento.', false); return; }
    if(!ticketCache){ txt('#status3','No hay ticket válido.', false); return; }

    disable('#btnStep3', true); txt('#status3','Confirmando…', true);
    try{
      const resp = await fetch(`${API_BASE}/api/usuario/account/delete/confirm`,{
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ ticket: ticketCache })
      });
      const data = await resp.json().catch(()=>({}));
      if(!resp.ok || data.ok === false){ throw new Error(data.message || 'Error al confirmar'); }
      show('#step1', false); show('#step2', false); show('#step3', false); show('#done', true); scrollTo('#done');
    }catch(e){
      console.error('Paso3', e);
      txt('#status3', e.message || 'No se pudo confirmar la solicitud.', false);
    }finally{
      disable('#btnStep3', false);
    }
  });
})();
</script>
