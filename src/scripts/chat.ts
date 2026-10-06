// Chat de IA. Se descarga recién con el primer click en la burbuja (ver
// ChatWidget.astro). Mismo endpoint, business_id y sesión que el sitio viejo;
// ahora también manda el idioma de la página. Los textos vienen en data-* del
// panel, en el idioma de la página.
import { registrar } from './eventos';

const AI_CHAT_URL = 'https://ftpoicnwpnurvptmkdoo.supabase.co/functions/v1/ai-chat';
const AI_CHAT_ANON_KEY = 'sb_publishable_3CoeGLx9VVsZ6-c8bkyGyg_xnWWL5t_';
const BUSINESS_ID = '19b3ff71-b46c-41f1-8e57-19fe2a5259ed';
const SESSION_KEY = 'structura_chat_session';

function nuevaSesion() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function sesion() {
  try {
    const existente = localStorage.getItem(SESSION_KEY);
    if (existente) return existente;
    const id = nuevaSesion();
    localStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    // Sin localStorage la sesión dura lo que dura la página, pero igual tiene
    // que ser impredecible: con un timestamp cualquiera podría adivinarla y
    // pedirle a la IA el historial de otro visitante.
    return nuevaSesion();
  }
}

export function iniciarChat() {
  const panel = document.getElementById('ai-widget-panel');
  const toggle = document.getElementById('ai-widget-toggle');
  const cerrar = document.getElementById('ai-widget-close');
  const form = document.getElementById('ai-widget-form');
  const input = document.getElementById('ai-widget-input');
  const mensajes = document.getElementById('ai-widget-messages');
  if (!panel || !toggle || !(form instanceof HTMLFormElement) || !(input instanceof HTMLInputElement) || !mensajes) return;

  const textos = panel.dataset;
  const sessionId = sesion();
  let enviando = false;

  const agregar = (texto: string, rol: 'user' | 'bot' | 'typing') => {
    const el = document.createElement('div');
    el.className = `ai-widget-msg ai-widget-msg--${rol}`;
    el.textContent = texto;
    mensajes.appendChild(el);
    mensajes.scrollTop = mensajes.scrollHeight;
    return el;
  };

  const abrir = (abierto: boolean) => {
    if (abierto && !panel.classList.contains('is-open')) registrar('chat-abierto');
    panel.classList.toggle('is-open', abierto);
    panel.setAttribute('aria-hidden', String(!abierto));
    toggle.setAttribute('aria-expanded', String(abierto));
    if (abierto) input.focus();
  };

  toggle.addEventListener('click', () => abrir(!panel.classList.contains('is-open')));
  cerrar?.addEventListener('click', () => abrir(false));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = input.value.trim();
    if (!texto || enviando) return;

    agregar(texto, 'user');
    input.value = '';
    enviando = true;
    input.disabled = true;
    const escribiendo = agregar(textos.typing ?? '', 'typing');

    fetch(AI_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: AI_CHAT_ANON_KEY,
        Authorization: `Bearer ${AI_CHAT_ANON_KEY}`,
      },
      body: JSON.stringify({ business_id: BUSINESS_ID, session_id: sessionId, message: texto, lang: textos.lang }),
    })
      .then((res) => res.json())
      .then((data: { respuesta?: string; whatsapp_link?: string }) => {
        escribiendo.remove();
        agregar(data.respuesta || (textos.errorReply ?? ''), 'bot');
        // Solo links https: una respuesta no puede meter un javascript: acá.
        if (data.whatsapp_link && /^https:\/\//.test(data.whatsapp_link)) {
          const cta = document.createElement('a');
          cta.href = data.whatsapp_link;
          cta.target = '_blank';
          cta.rel = 'noopener';
          cta.className = 'ai-widget-cta';
          cta.textContent = textos.whatsappCta ?? '';
          mensajes.appendChild(cta);
          mensajes.scrollTop = mensajes.scrollHeight;
        }
      })
      .catch(() => {
        escribiendo.remove();
        agregar(textos.errorConnection ?? '', 'bot');
      })
      .finally(() => {
        enviando = false;
        input.disabled = false;
        input.focus();
      });
  });

  // El click que descargó este módulo abre el panel.
  abrir(true);
}
