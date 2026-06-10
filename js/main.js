// ================================
// PROMABID — main.js
// ================================

// ---- SCROLL HELPER ----
function scrollTo(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ---- NAVBAR shrink on scroll ----
window.addEventListener('scroll', function () {
  var nav = document.getElementById('navbar');
  if (!nav) return;
  if (window.scrollY > 80) {
    nav.style.padding = '8px 40px';
    nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.6)';
  } else {
    nav.style.padding = '12px 40px';
    nav.style.boxShadow = 'none';
  }
});

// ---- SMOOTH SCROLL for nav links ----
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ---- DEVIS FORM avec FormSubmit (AJAX) ----
async function submitForm() {
  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const type = document.getElementById('f-type').value;
  const budget = document.getElementById('f-budget').value;
  const desc = document.getElementById('f-desc').value.trim();

  // 1. Validation de base
  if (!name || !phone || !type) {
    alert('Veuillez remplir les champs obligatoires (Nom, Téléphone, Type de travaux).');
    return;
  }

  // UI : État d'envoi
  const btn = document.querySelector('.btn-submit');
  const btnText = document.getElementById('btn-text');
  btn.disabled = true;
  btnText.textContent = 'Envoi en cours...';

  // 2. Préparation des données pour FormSubmit & Firestore
  const formData = {
    name: name,
    phone: phone,
    email: email || 'Non fourni',
    type_travaux: type,
    budget: budget || 'Non spécifié',
    message: desc || 'Aucune description',
    _cc: "h.abidi@esisa.ac.ma", // Copie vers email institutionnel
    _subject: "Nouveau Devis PROMABID — " + name,
    _template: "table"
  };

  try {
    // 3. Envoi vers FormSubmit (Email)
    const response = await fetch("https://formsubmit.co/ajax/ste.promabid@gmail.com", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    });

    // 4. Envoi vers Firestore (Database - si le script est chargé)
    if (typeof submitQuoteToFirestore === 'function') {
      await submitQuoteToFirestore({
        customer_name: name,
        customer_phone: phone,
        customer_email: email,
        project_type: type,
        estimated_budget: budget,
        description: desc
      });
    }

    if (response.ok) {
      showSuccess();
    } else {
      throw new Error("Erreur FormSubmit");
    }

  } catch (error) {
    console.error("Submission Error:", error);
    alert("Une erreur est survenue. Veuillez nous contacter par téléphone.");
    btn.disabled = false;
    btnText.textContent = 'Envoyer ma demande de devis →';
  }
}

function showSuccess() {
  document.getElementById('devis-form').style.display = 'none';
  document.getElementById('form-success').style.display = 'block';
  document.getElementById('form-success').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ---- CHATBOT FINAL LOGIC ----
function toggleChat() {
  const box = document.getElementById('chatbot-box');
  box.classList.toggle('open');
}

function quickMsg(text) {
  const input = document.getElementById('chat-input');
  input.value = text;
  sendMsg();
}

function sendMsg() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  // 1. Clear input immediately for better UX
  input.value = '';

  // 2. Add user message and scroll
  addMsg(text, 'user');

  // Show typing indicator
  showTyping();

  setTimeout(() => {
    removeTyping();
    const lower = text.toLowerCase();
    
    // Intent Detection Refinement
    // Keywords that should trigger the Quote/Devis flow
    const devisKeywords = ['devis', 'prix', 'coût', 'tarif', 'faire un projet', 'construire', 'bâtir', 'rénover', 'commander'];
    
    let reply = "Merci pour votre message ! Hamza ou Ibrahim vous répondra très bientôt. 🏗️";

    if (devisKeywords.some(keyword => lower.includes(keyword))) {
      reply = "Avec plaisir ! Je vous invite à remplir notre formulaire de devis juste au-dessus. Hamza ou Ibrahim reviendra vers vous sous 24h pour étudier votre projet. 🛠️";
      addMsg(reply, 'bot');
      // Smooth scroll to the devis section after a short delay
      setTimeout(() => scrollTo('devis'), 1200);
      return;
    }

    if (lower.includes('service')) {
      reply = "Nos services principaux :\n1️⃣ Gros Œuvre & Construction\n2️⃣ Travaux Tous Corps d'État\n3️⃣ Négoce & Vente Matériaux";
    } else if (lower.includes('contact')) {
      reply = "Vous pouvez nous joindre au :\n📞 +212 631 32 10 83\n📍 85 Rue Riad Hay Hassani 3, Route Ain Chkef, Fès.";
    } else if (lower.includes('projet')) {
      // General projects info only if "devis" intent wasn't matched
      reply = "Nous avons réalisé de nombreux projets comme l'École AZZAHRAE et des immeubles R+2 à Fès. Découvrez-les dans la section Portfolio !";
    }

    addMsg(reply, 'bot');
  }, 600);
}

function addMsg(text, type) {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `msg ${type}`;
  div.innerText = text;
  msgs.appendChild(div);
  
  // Auto-scroll to bottom
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg bot typing';
  div.id = 'typing';
  div.innerHTML = '<span></span><span></span><span></span>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typing');
  if (t) t.remove();
}
