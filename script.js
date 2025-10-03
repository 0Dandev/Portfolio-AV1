(function() {
    emailjs.init({
        publicKey: "YOUR_PUBLIC_KEY",
    });
})();

const form = document.getElementById('contact-form');
const feedbackMessage = document.getElementById('feedback-message');

function showFeedback(message, isError = false) {
    feedbackMessage.textContent = message;
    feedbackMessage.style.display = 'block';
    feedbackMessage.style.color = isError ? 'red' : 'green';
    setTimeout(() => {
        feedbackMessage.style.display = 'none';
    }, 5000);
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const userEmail = document.getElementById('user_email').value;

    if (!userEmail.includes('@') || !userEmail.includes('.')) {
        showFeedback("Por favor, insira um endereço de e-mail válido.", true);
        return;
    }

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(() => {
            showFeedback('Mensagem enviada com sucesso! Em breve entrarei em contato.');
            form.reset();
        }, (error) => {
            console.log('FALHA NO ENVIO...', error);
            showFeedback('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.', true);
        });
});