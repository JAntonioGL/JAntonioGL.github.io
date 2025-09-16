---
layout: default
title: Eliminar cuenta — YoVerifico
description: Solicita la eliminación de tu cuenta y datos personales de YoVerifico.
section: eliminar
permalink: /eliminar-cuenta
---


# Eliminar cuenta y datos
Si deseas eliminar tu cuenta de **YoVerifico**, llena el siguiente formulario. Recibirás un correo de confirmación con un número de ticket.


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
<div style="display:none;" aria-hidden="true">
<label for="empresa">Empresa</label>
<input id="empresa" name="empresa" type="text" tabindex="-1" autocomplete="off" />
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


<p class="muted" style="margin-top:1rem;">Si tienes problemas con el formulario, escribe a <a href="mailto:soporte@yoverifico.com.mx">soporte@yoverifico.com.mx</a>.</p>


<!-- Carga del JS específico de esta página -->
<script defer src="{{ "/assets/js/eliminar.js" | relative_url }}"></script>


<!-- Estilos mínimos del formulario -->
<style>
.form-box{border:1px solid #e5e7eb;border-radius:12px;padding:16px;max-width:720px;background:#fff}
.field{margin-bottom:12px}
.field label{display:block;font-weight:600;margin-bottom:6px}
.field input[type="text"],.field input[type="email"],.field textarea{width:100%;padding:10px 12px;border:1px solid #e5e7eb;border-radius:10px}
.checkbox{display:flex;align-items:flex-start;gap:.5rem}
.actions{display:flex;align-items:center;gap:12px;margin-top:8px}
#btnEnviar{background:#0f766e;color:#fff;padding:10px 14px;border-radius:10px;border:0;cursor:pointer}
#btnEnviar[disabled]{opacity:.6;cursor:not-allowed}
.muted{color:#6b7280}
</style>