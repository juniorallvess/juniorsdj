// Inicializa o EmailJS
(function() {
    emailjs.init("SEU_USER_ID"); // Substitua com seu User ID do EmailJS
})();

// Contact form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Mostrar indicador de carregamento
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    // Enviar email usando EmailJS
    emailjs.send('default_service', 'template_id', { // Substitua com seu Service ID e Template ID
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'contatojuniorsmusic@gmail.com'
    })
    .then(function() {
        // Sucesso
        alert('Obrigado! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.');
        contactForm.reset();
    })
    .catch(function(error) {
        // Erro
        console.error('Erro ao enviar mensagem:', error);
        alert('Desculpe, ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato através do WhatsApp.');
    })
    .finally(function() {
        // Restaurar botão
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    });
});
