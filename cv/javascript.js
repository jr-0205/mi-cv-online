/* ================= ELEMENTOS ================= */
const modal = document.getElementById('contactModal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
const form = document.getElementById('contactForm');
const response = document.getElementById('formResponse');
const submitBtn = document.getElementById('submitBtn');

/* ================= MODAL ================= */
openBtn.onclick = () => modal.style.display = 'block';
closeBtn.onclick = () => modal.style.display = 'none';

window.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
};

/* ================= FORM ================= */
form.onsubmit = (e) => {
    e.preventDefault();

    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    emailjs.sendForm(
        'service_bfnf7wt',
        'template_g0mp2qp',
        form
    ).then(() => {
        response.textContent = 'Mensaje enviado correctamente.';
        response.style.color = '#22c55e';
        form.reset();

        setTimeout(() => {
            modal.style.display = 'none';
            submitBtn.textContent = 'Enviar mensaje';
            submitBtn.disabled = false;
        }, 3000);

    }).catch(() => {
        response.textContent = 'Error al enviar el mensaje.';
        response.style.color = '#ef4444';
        submitBtn.textContent = 'Enviar mensaje';
        submitBtn.disabled = false;
    });
};
