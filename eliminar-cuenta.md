
---
layout: default
title: Eliminar cuenta — YoVerifico
description: Solicita la eliminación de tu cuenta y datos personales de YoVerifico.
section: eliminar
permalink: /eliminar-cuenta
---

# Eliminar cuenta y datos de YoVerifico

Esta página te permite **solicitar la eliminación permanente** de tu cuenta y de los datos personales asociados a YoVerifico. Si ya no tienes acceso a la app, puedes usar este formulario web.

**¿Qué se eliminará?**
- Datos de tu perfil (correo y preferencias).
- Vehículos registrados y la configuración de recordatorios.
- Historial operativo no requerido por ley.

**¿Qué puede conservarse temporalmente?**
- **Registros mínimos** para prevención de fraude/seguridad y cumplimiento legal, durante un periodo limitado.

**Suscripciones y pagos (Google Play)**
- La eliminación de cuenta **no gestiona reembolsos**. Si tienes una suscripción activa, cancélala desde **Google Play** para detener cobros futuros.

**Plazos de atención**
- Confirmamos la recepción inmediatamente y procesamos la eliminación en un plazo de **hasta 7 días hábiles**.

**Contacto alterno**
- Si tienes problemas con este formulario, escríbenos a **privacidad@yoverifico.com.mx**.

---

<h1>Eliminar cuenta y datos</h1>
<p>
Si deseas eliminar tu cuenta de <strong>YoVerifico</strong>, llena el siguiente formulario.
Recibirás un correo de confirmación con un número de ticket.
</p>

<form id="formEliminar" class="form-box" novalidate>
  <div class="field">
    <label for="email">Correo registrado <span style="color:red">*</span></label>
    <input id="email" name="email" type="email" required placeholder="tu@correo.com" autocomplete="email" />
  </div>

  <div class="field">
    <label for="nombre">Nombre (opcional)</label>
    <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" />
  </div>

  <div class="field">
    <label for="motivo">Motivo o comentarios (opcional)</label>
    <textarea id="motivo" name="motivo" rows="4" placeholder="Escribe aquí si quieres añadir un comentario"></textarea>
  </div>

  <!-- Honeypot anti-spam -->
  <div style="display:none;">
    <label for="empresa">Empresa</label>
    <input id="empresa" name="empresa" type="text" />
  </div>

  <div class="field checkbox">
    <input id="consent" name="consent" type="checkbox" required />
    <label for="consent">Confirmo que deseo eliminar de forma permanente mi cuenta y datos asociados.</label>
  </div>

  <div class="actions">
    <button id="btnEnviar" type="submit">Solicitar eliminación</button>
    <span id="estado" role="status" aria-live="polite"></span>
  </div>
</form>
<form id="formEliminar" class="form-box" novalidate>
  <div class="field">
    <label for="email">Correo con el que te registraste <span aria-hidden="true">*</span></label>
    <input id="email" name="email" type="email" required placeholder="tu@correo.com" autocomplete="email" />
    <small class="hint">Usa el mismo correo que utilizaste en la app.</small>
  </div>

  <div class="field">
    <label for="nombre">Nombre (opcional)</label>
    <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" autocomplete="name" />
  </div>

  <div class="field">
    <label for="motivo">Motivo o comentarios (opcional)</label>
    <textarea id="motivo" name="motivo" rows="4" placeholder="Cuéntanos si hay algo que debamos saber"></textarea>
  </div>

  <!-- Honeypot anti‑spam (no llenar) -->
  <div class="hp" aria-hidden="true">
    <label for="empresa">Empresa</label>
    <input id="empresa" name="empresa" type="text" tabindex="-1" autocomplete="off" />
  </div>

  <div class="field checkbox">
    <input id="consent" name="consent" type="checkbox" required />
    <label for="consent">Confirmo que deseo eliminar **de forma permanente** mi cuenta y datos asociados.</label>
  </div>

  <div class="actions">
    <button id="btnEnviar" class="button" type="submit">Solicitar eliminación</button>
    <span id="estado" class="estado" role="status" aria-live="polite"></span>
  </div>

  <p class="legal muted">
    Al enviar esta solicitud aceptas que verificaremos tu identidad mediante el correo indicado. Conservaremos registros mínimos necesarios por razones de seguridad y cumplimiento. Consulta la <a href="{{ "/politicas-privacidad" | relative_url }}">Política de Privacidad</a>.
  </p>
</form>

<script defer src="{{ "/assets/js/eliminar.js" | relative_url }}"></script>

<style>
.form-box{border:1px solid #e5e7eb;border-radius:1rem;padding:1rem;max-width:720px}
.field{margin-bottom:1rem}
.field label{display:block;font-weight:600;margin-bottom:.35rem}
.field input[type="text"], .field input[type="email"], .field textarea{width:100%;padding:.65rem .75rem;border:1px solid #e5e7eb;border-radius:.6rem}
.field .hint{color:#6b7280}
.checkbox{display:flex;align-items:flex-start;gap:.5rem}
.actions{display:flex;align-items:center;gap:1rem}
.button{background:#0f766e;color:#fff;padding:.65rem 1rem;border-radius:.75rem;border:none;cursor:pointer}
.button[disabled]{opacity:.6;cursor:not-allowed}
.estado{min-height:1.25rem}
.legal{margin-top:1rem}
.hp{position:absolute;left:-9999px;}
</style>