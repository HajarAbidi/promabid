# STE PROMABID SARL — Site Web Complet
## Guide d'installation et configuration

---

## 📁 Structure du dossier
```
promabid-final/
├── index.html          ← Page principale complète
├── css/
│   └── style.css       ← Design complet (noir & or)
├── js/
│   └── main.js         ← Chatbot + formulaire devis + animations
├── images/
│   └── logo.svg        ← Logo PROMABID vectoriel
└── README.md           ← Ce guide
```

---

## 🚀 Ouvrir le site sur votre PC
1. Extrayez le ZIP
2. Double-cliquez sur `index.html`
3. Le site s'ouvre dans Chrome/Firefox avec les vraies images (internet requis)

---

## 📧 Configurer l'envoi d'emails (formulaire devis)

Le formulaire envoie automatiquement les devis à :
- **ste.promabid@gmail.com** (email officiel)
- **hajarabidi03@gmail.com** (email de test)

### Étapes de configuration EmailJS (gratuit) :

**1.** Créez un compte sur https://emailjs.com

**2.** Ajoutez un "Email Service" → choisissez Gmail → connectez ste.promabid@gmail.com

**3.** Créez un "Email Template" avec ce contenu :
```
Nouvelle demande de devis PROMABID

Nom : {{from_name}}
Téléphone : {{phone}}
Email : {{reply_to}}
Type de travaux : {{type_travaux}}
Budget : {{budget}}
Description : {{description}}
```

**4.** Copiez vos clés dans `js/main.js` :
- Ligne 1 : `emailjs.init("VOTRE_PUBLIC_KEY")` → dans index.html
- Ligne dans submitForm : `emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', ...)`

**5.** Dans le template EmailJS, mettez 2 adresses destinataires :
- ste.promabid@gmail.com
- hajarabidi03@gmail.com

---

## 🌐 Mettre le site en ligne

### Option gratuite (Netlify) :
1. Créez compte sur https://netlify.com
2. Glissez-déposez le dossier `promabid-final/`
3. Site en ligne en 2 minutes sur une URL Netlify

### Option professionnelle :
- Domaine : **promabid.ma** sur Genious.ma (~100 MAD/an)
- Hébergement : Hostinger (~50 MAD/mois)
- Email professionnel : contact@promabid.ma

---

## 📸 Ajouter vos vraies photos
Les images viennent d'Unsplash (internet requis).
Pour les remplacer par vos photos de chantiers :
1. Copiez vos photos dans le dossier `images/`
2. Dans `index.html`, remplacez les URLs Unsplash par vos chemins locaux
   Ex: `images/chantier1.jpg` au lieu de l'URL Unsplash

---

## 📞 Informations de l'entreprise
- **Hamza Abidi** : +212 631 32 10 83
- **Ibrahim Abidi** : +212 669 12 25 37
- **FAX** : +212 535 69 36 33
- **Email** : ste.promabid@gmail.com
- **Adresse** : 85 Rue Riad Hay Hassani 3, Route Ain Chkef, FES 30000
