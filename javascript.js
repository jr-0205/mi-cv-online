const EMAILJS_PUBLIC_KEY = '6vuDY9WSW6-dLFQhG';
const EMAILJS_SERVICE = 'service_bfnf7wt';
const EMAILJS_TEMPLATE = 'template_g0mp2qp';

const modal = document.getElementById('contactModal');
const form = document.getElementById('contactForm');
const response = document.getElementById('formResponse');
const submitBtn = document.getElementById('submitBtn');
const openButtons = document.querySelectorAll('[data-open-contact]');
const closeButtons = document.querySelectorAll('[data-close-contact]');
const currentYear = document.getElementById('currentYear');

let lastFocusedElement = null;

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (window.emailjs) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

function openModal() {
  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  const firstInput = modal.querySelector('input');
  requestAnimationFrame(() => firstInput?.focus());
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  response.textContent = '';
  response.className = 'form-response';
  lastFocusedElement?.focus();
}

openButtons.forEach((button) => button.addEventListener('click', openModal));
closeButtons.forEach((button) => button.addEventListener('click', closeModal));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) {
    closeModal();
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  response.textContent = '';
  response.className = 'form-response';
  submitBtn.textContent = 'Enviando…';
  submitBtn.disabled = true;

  if (!window.emailjs) {
    response.textContent = 'No fue posible cargar el servicio de correo. Intenta de nuevo más tarde.';
    response.classList.add('error');
    submitBtn.textContent = 'Enviar mensaje';
    submitBtn.disabled = false;
    return;
  }

  try {
    await emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, form);
    response.textContent = 'Mensaje enviado correctamente.';
    response.classList.add('success');
    form.reset();
    submitBtn.textContent = 'Enviado';

    window.setTimeout(() => {
      submitBtn.textContent = 'Enviar mensaje';
      submitBtn.disabled = false;
      closeModal();
    }, 1800);
  } catch {
    response.textContent = 'No se pudo enviar el mensaje. Intenta nuevamente.';
    response.classList.add('error');
    submitBtn.textContent = 'Enviar mensaje';
    submitBtn.disabled = false;
  }
});
