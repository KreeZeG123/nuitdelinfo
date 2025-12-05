

let popupCounter = 0;
let scenarioStarted = false;


const pubs = [
    { title: "🚨 VIRUS DÉTECTÉ!", msg: "Votre PC est infecté ! Cliquez ici !", type: "ad", icon: "🦠" },
    { title: "💰 FÉLICITATIONS!", msg: "Vous êtes le 1000000ème visiteur !", type: "ad", icon: "🎉" },
    { title: "⚠️ Mise à jour", msg: "Installation de Windows 12... Patientez...", type: "warning", icon: "⏳" },
    { title: "💾 RAM insuffisante", msg: "Téléchargez de la RAM ici !", type: "ad", icon: "📊" },
    { title: "📧 Spam", msg: "Héritage de 50 millions $ en attente !", type: "info", icon: "💸" },
    { title: "🔥 OFFRE LIMITÉE", msg: "Pilules miracles -90% ! Cliquez vite !", type: "ad", icon: "💊" },
    { title: "🎰 CASINO EN LIGNE", msg: "Gagnez 10000€ en 5 minutes !", type: "ad", icon: "🎲" },
    { title: "⚡ Alerte Critique", msg: "Votre ordinateur a été piraté !", type: "error", icon: "🔓" },
    { title: "💻 Performance", msg: "Votre PC est 99% plus lent !", type: "warning", icon: "🐌" },
    { title: "🎁 Cadeau gratuit", msg: "iPhone 15 Pro Max offert !", type: "ad", icon: "📱" },
    { title: "🌐 Connexion perdue", msg: "Reconnexion impossible...", type: "error", icon: "📡" },
    { title: "🔒 Sécurité", msg: "Mot de passe expiré depuis 2003", type: "warning", icon: "🔑" }
];

function openIE() {
    if (scenarioStarted) {
        createPopupLoading("Internet Explorer", "Connexion à www.bing.com...");
        return;
    }
    createPopupCentral("Internet Explorer", "Connexion à www.bing.com... <br><br>Chargement... (10%)", "info");
    setTimeout(() => startScenario(), 2000); // Démarre après 2 secondes
}

// Popup de chargement infini
function createPopupLoading(titre, message) {
    const container = document.getElementById('popup-container');
    const id = ++popupCounter;
    const win = document.createElement('div');
    win.className = 'window-xp';
    win.id = `popup-${id}`;
    win.style.cssText = 'position: fixed; left: 50%; top: 40%; transform: translate(-50%, -50%); z-index: 6000;';
    
    let progress = 0;
    win.innerHTML = `
        <div class="title-bar">
            <span>${titre}</span>
            <div class="window-buttons">
                <div class="window-btn close-btn" onclick="closeWindow(${id})">✕</div>
            </div>
        </div>
        <div class="window-content">
            <p>${message}</p>
            <div style="width: 100%; background: #ddd; height: 20px; margin: 20px 0; border: 1px solid #999;">
                <div id="progress-${id}" style="width: 0%; height: 100%; background: linear-gradient(to right, #0054E3, #3094F0); transition: width 0.3s;"></div>
            </div>
            <p id="progress-text-${id}" style="font-size: 11px;">Chargement... 0%</p>
        </div>
    `;
    container.appendChild(win);
    
    // Animation de chargement qui ralentit et ne finit jamais
    const interval = setInterval(() => {
        progress += Math.random() * 2;
        if (progress > 99) progress = 99; // Bloqué à 99%
        
        const bar = document.getElementById(`progress-${id}`);
        const text = document.getElementById(`progress-text-${id}`);
        if (bar) bar.style.width = progress + '%';
        if (text) {
            if (progress > 95) {
                text.innerText = "Chargement... 99% (Ne répondez pas)";
            } else {
                text.innerText = `Chargement... ${Math.floor(progress)}%`;
            }
        }
    }, 500);
    
    // Nettoyer l'interval quand la fenêtre est fermée
    setTimeout(() => {
        const checkClosed = setInterval(() => {
            if (!document.getElementById(`popup-${id}`)) {
                clearInterval(interval);
                clearInterval(checkClosed);
            }
        }, 100);
    }, 100);
}

function openData() {
    if (scenarioStarted) return;
    createPopupCentral("Sécurité Windows", "🔒 ACCÈS REFUSÉ. <br>Veuillez insérer votre carte bancaire.", "error");
    setTimeout(() => startScenario(), 2000);
}

function openTrash() {
    if (scenarioStarted) {
        createTrashWindow();
        return;
    }
    createPopupCentral("Corbeille", "Impossible de vider la corbeille. Trop de déchets numériques.", "warning");
    setTimeout(() => startScenario(), 2000);
}

// Fenêtre Corbeille PLEINE
function createTrashWindow() {
    const container = document.getElementById('popup-container');
    const id = ++popupCounter;
    const win = document.createElement('div');
    win.className = 'window-xp';
    win.id = `popup-${id}`;
    win.style.cssText = 'position: fixed; left: 30%; top: 20%; z-index: 6000; min-width: 400px;';
    
    const trashFiles = [
        "virus.exe", "trojan_2003.dll", "spam_emails_archive.pst",
        "cookies_tracking_1998-2024.db", "mon_ex.jpg", "passwords.txt",
        "bitcoin_wallet_perdu.dat", "project_final_final_v2_VRAIMENT_FINAL.doc",
        "nude_virus.exe", "ransomware.zip", "memoires_embarrassantes.avi"
    ];
    
    let fileList = trashFiles.map(f => `<div style="padding: 2px; font-size: 11px;">📄 ${f}</div>`).join('');
    
    win.innerHTML = `
        <div class="title-bar">
            <span>🗑️ Corbeille</span>
            <div class="window-buttons">
                <div class="window-btn close-btn" onclick="closeWindow(${id})">✕</div>
            </div>
        </div>
        <div class="window-content">
            <p><strong>Éléments : ${trashFiles.length}</strong> | <span style="color: red;">Espace : 999 Go</span></p>
            <div style="max-height: 200px; overflow-y: scroll; border: 1px solid #999; padding: 5px; background: white; margin: 10px 0;">
                ${fileList}
            </div>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button class="btn btn-sm xp-button" onclick="emptyTrashFail()">Vider la corbeille</button>
                <button class="btn btn-sm xp-button" onclick="closeWindow(${id})">Annuler</button>
            </div>
        </div>
    `;
    container.appendChild(win);
}

function emptyTrashFail() {
    createPopup("Erreur", "❌ Impossible de vider la corbeille.<br><br>Raison : Les fichiers sont protégés par Windows Genuine Advantage™", "error");
}

function openComputer() {
    if (scenarioStarted) return;
    createPopupCentral("Mon Ordinateur", "Disque C: PLEIN (0 octets libres). <br>Veuillez acheter un abonnement Cloud.", "warning");
    setTimeout(() => startScenario(), 2000);
}

// Page de sensibilisation à la surveillance
function openSurveillancePage() {
    const container = document.getElementById('popup-container');
    const id = ++popupCounter;
    const win = document.createElement('div');
    win.className = 'window-xp';
    win.id = `popup-${id}`;
    win.style.cssText = 'position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 7000; width: 600px; max-width: 90vw; height: 500px; max-height: 85vh;';
    
    win.innerHTML = `
        <div class="title-bar">
            <span>👁️ Sensibilisation à la Surveillance Numérique</span>
            <div class="window-buttons">
                <div class="window-btn close-btn" onclick="closeWindow(${id})">✕</div>
            </div>
        </div>
        <div class="window-content" style="height: calc(100% - 30px); overflow-y: auto; padding: 20px;">
            <h3 style="color: #0054E3; margin-top: 0;">🕵️ Vous êtes surveillé(e) !</h3>
            <p style="font-size: 13px; line-height: 1.6;">
                Chaque jour, vos données personnelles sont collectées, analysées et vendues par les géants de la tech. 
                Vos recherches, vos messages, vos photos, votre localisation... tout est enregistré.
            </p>
            
            <div style="background: #fff3cd; border: 2px solid #ffc107; padding: 15px; margin: 15px 0; border-radius: 5px;">
                <h4 style="margin-top: 0; color: #856404;">⚠️ Le saviez-vous ?</h4>
                <ul style="font-size: 12px; margin: 10px 0; padding-left: 20px;">
                    <li>Les GAFAM collectent en moyenne 72 Go de données par utilisateur chaque année</li>
                    <li>Votre historique de navigation est vendu à des annonceurs pour cibler vos faiblesses</li>
                    <li>Les assistants vocaux écoutent en permanence (même quand vous croyez qu'ils dorment)</li>
                    <li>Vos métadonnées révèlent plus sur vous que le contenu de vos messages</li>
                </ul>
            </div>
            
            <h4 style="color: #0054E3;">🛡️ Comment se protéger ?</h4>
            <div style="font-size: 12px; line-height: 1.6; margin: 10px 0;">
                <p><strong>✅ Utilisez des logiciels open-source</strong> (Linux, Firefox, Signal...)</p>
                <p><strong>✅ Chiffrez vos communications</strong> (VPN, messageries sécurisées)</p>
                <p><strong>✅ Limitez les permissions des applications</strong></p>
                <p><strong>✅ Lisez les politiques de confidentialité</strong> (ou au moins essayez 😅)</p>
                <p><strong>✅ Désactivez la géolocalisation quand elle n'est pas nécessaire</strong></p>
            </div>
            
            <div style="background: #d1ecf1; border: 2px solid #17a2b8; padding: 15px; margin: 15px 0; border-radius: 5px; text-align: center;">
                <p style="font-size: 14px; margin: 0; font-weight: bold;">
                    💡 La vie privée est un droit fondamental, pas un luxe !
                </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <button class="btn btn-primary xp-button" onclick="closeWindow(${id})">J'ai compris</button>
            </div>
            
            <p style="font-size: 10px; color: #666; text-align: center; margin-top: 20px; font-style: italic;">
                Cette page sera bientôt remplacée par du contenu interactif plus complet
            </p>
        </div>
    `;
    container.appendChild(win);
    
    // Démarrer le scénario si pas encore démarré
    if (!scenarioStarted) {
        setTimeout(() => startScenario(), 2000);
    }
}

// Support Technique : Chat Bot Débile
let chatMessages = [];
let chatMessageIndex = 0;

function openSupportChat() {
    const container = document.getElementById('popup-container');
    const id = ++popupCounter;
    const win = document.createElement('div');
    win.className = 'window-xp';
    win.id = `popup-${id}`;
    // FENÊTRE COMPLÈTE ET IMPOSANTE !
    win.style.cssText = 'position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 7000; width: 700px; max-width: 90vw; height: 600px; max-height: 85vh;';
    
    chatMessages = [];
    chatMessageIndex = 0;
    
    win.innerHTML = `
        <div class="title-bar">
            <span>💬 Chat Bruti - Service Client Premium</span>
            <div class="window-buttons">
                <div class="window-btn close-btn" onclick="closeWindow(${id})">✕</div>
            </div>
        </div>
        <div class="window-content" style="height: calc(100% - 30px); display: flex; flex-direction: column;">
            <div style="background: #f0f0f0; padding: 10px; border-bottom: 2px solid #0054E3; margin-bottom: 10px;">
                <h3 style="margin: 0; color: #0054E3; font-size: 16px;">🤖 Chat Bruti</h3>
                <p style="margin: 5px 0 0 0; font-size: 11px; color: #666;">En ligne • Temps de réponse : ∞ minutes</p>
            </div>
            <div id="chat-${id}" style="flex: 1; overflow-y: auto; border: 2px solid #999; padding: 15px; background: white; margin-bottom: 10px; font-size: 13px;">
                <div style="background: #e3f2fd; padding: 10px; border-radius: 5px; margin-bottom: 10px; border-left: 4px solid #0054E3;">
                    <strong>🤖 BotSupport:</strong> Bonjour ! Je suis votre assistant virtuel Chat Bruti.<br>
                    <span style="font-size: 11px; color: #666;">Je suis là pour ne pas résoudre vos problèmes. Comment puis-je vous frustrer aujourd'hui ?</span>
                </div>
            </div>
            <div style="display: flex; gap: 8px; padding: 10px; background: #f0f0f0; border-top: 1px solid #ccc;">
                <input type="text" id="chat-input-${id}" placeholder="Décrivez votre problème (ça ne changera rien)..." 
                    style="flex: 1; padding: 10px; font-size: 13px; border: 2px solid #999; border-radius: 3px;" 
                    onkeypress="if(event.key==='Enter') sendChatMessage(${id})">
                <button class="btn btn-primary xp-button" onclick="sendChatMessage(${id})" style="padding: 10px 20px;">📤 Envoyer</button>
            </div>
        </div>
    `;
    container.appendChild(win);
}

function sendChatMessage(winId) {
    const input = document.getElementById(`chat-input-${winId}`);
    const chatDiv = document.getElementById(`chat-${winId}`);
    if (!input || !chatDiv) return;
    
    const userMsg = input.value.trim();
    if (!userMsg) return;
    
    // Message utilisateur - Style moderne avec bulle
    chatDiv.innerHTML += `
        <div style="margin: 10px 0; text-align: right;">
            <div style="display: inline-block; background: #0054E3; color: white; padding: 10px 15px; border-radius: 15px 15px 0 15px; max-width: 70%; text-align: left;">
                <strong>👤 Vous:</strong><br>${userMsg}
            </div>
        </div>
    `;
    input.value = '';
    
    // Afficher l'indicateur de frappe
    const typingId = `typing-${Date.now()}`;
    chatDiv.innerHTML += `
        <div id="${typingId}" style="margin: 10px 0;">
            <div style="display: inline-block; background: #f0f0f0; padding: 10px 15px; border-radius: 15px 15px 15px 0; color: #666; font-style: italic;">
                <strong>🤖 BotSupport</strong> est en train d'écrire...
            </div>
        </div>
    `;
    chatDiv.scrollTop = chatDiv.scrollHeight;
    
    // Réponses absurdes du bot - VERSION ÉTENDUE
    const botResponses = [
        "Avez-vous essayé de redémarrer ? C'est la solution à 99,9% des problèmes. Les 0,1% restants ? Redémarrez deux fois.",
        "Ce problème est normal. C'est une fonctionnalité, pas un bug. Microsoft l'a conçu ainsi pour vous faire apprécier Linux.",
        "Veuillez patienter 48h pour une réponse. Ou 72h. Peut-être une semaine. On ne sait jamais vraiment.",
        "Erreur 404 : Compétence non trouvée. Avez-vous vérifié dans la corbeille ?",
        "Avez-vous Windows Vista ? Si non, installez-le. C'était le meilleur Windows. (Je plaisante, bien sûr)",
        "Je vais transférer votre demande à mon supérieur. (Spoiler : il n'existe pas. Personne n'existe ici.)",
        "Votre garantie a expiré en 2001. Mais ne vous inquiétez pas, elle n'a jamais vraiment fonctionné.",
        "C'est clairement un problème entre la chaise et le clavier. Avez-vous essayé de changer de chaise ?",
        "Avez-vous essayé de souffler dans le port USB ? Ça marche sur les cartouches Nintendo, pourquoi pas ici ?",
        "La solution : achetez un Mac. Ah non, attendez... Achetez Linux. Non, c'est gratuit. Téléchargez Linux !",
        "Je ne comprends pas votre question. Pour être honnête, je ne me comprends pas moi-même.",
        "Veuillez remplir le formulaire A38 en triple exemplaire. Puis le formulaire B72. Puis abandonnez.",
        "Avez-vous installé toutes les mises à jour Windows ? Elles ne servent à rien, mais c'est obligatoire.",
        "Votre problème est causé par une incompatibilité avec Windows XP. (Vous n'avez pas XP ? Dommage.)",
        "Je vous conseille de formater votre disque dur. Ça ne résoudra rien, mais au moins vous repartirez de zéro.",
        "Erreur : Votre ordinateur est trop vieux pour être réparé. Il devrait être dans un musée.",
        "Avez-vous essayé de débrancher et rebrancher le câble d'alimentation ? Pendant que l'ordi est allumé ?",
        "C'est pas un bug, c'est une fonctionnalité premium. Payez 99€/mois pour la débloquer.",
        "Je vais escalader votre ticket au niveau 2. (Il n'y a pas de niveau 2, désolé)",
        "Votre ordinateur a 47 virus. Cliquez ici pour ne rien faire du tout."
    ];
    
    setTimeout(() => {
        // Supprimer l'indicateur de frappe
        const typingDiv = document.getElementById(typingId);
        if (typingDiv) typingDiv.remove();
        
        // Message du bot - Style bulle moderne
        const botMsg = botResponses[Math.floor(Math.random() * botResponses.length)];
        chatDiv.innerHTML += `
            <div style="margin: 10px 0;">
                <div style="display: inline-block; background: #e3f2fd; border: 2px solid #0054E3; padding: 10px 15px; border-radius: 15px 15px 15px 0; max-width: 75%; text-align: left;">
                    <strong style="color: #0054E3;">🤖 BotSupport:</strong><br>
                    <span style="color: #333;">${botMsg}</span>
                </div>
            </div>
        `;
        chatDiv.scrollTop = chatDiv.scrollHeight;
    }, 1500 + Math.random() * 1000); // Temps de "réflexion" variable (1.5-2.5s)
    
    chatDiv.scrollTop = chatDiv.scrollHeight;
}


// Popup CENTRALE (pour la première alerte) - NON BLOQUANTE
function createPopupCentral(titre, message, type = 'info') {
    const container = document.getElementById('popup-container');
    const windowDiv = document.createElement('div');
    const id = ++popupCounter;
    
    windowDiv.classList.add('window-xp');
    windowDiv.id = `popup-${id}`;
    
    // Position CENTRÉE mais pas de overlay bloquant
    windowDiv.style.left = '50%';
    windowDiv.style.top = '50%';
    windowDiv.style.transform = 'translate(-50%, -50%)';
    windowDiv.style.zIndex = '5000';
    
    // Icone
    let iconSymbol = 'ℹ️';
    if(type === 'error') iconSymbol = '❌';
    if(type === 'warning') iconSymbol = '⚠️';

    windowDiv.innerHTML = `
        <div class="title-bar">
            <span>${titre}</span>
            <div class="window-buttons">
                <div class="window-btn close-btn" onclick="closeWindow(${id})">✕</div>
            </div>
        </div>
        <div class="window-content">
            <div style="font-size: 48px; margin-bottom: 10px;">${iconSymbol}</div>
            <p style="font-size: 16px;">${message}</p>
            <div style="margin-top: 15px;">
                <button class="btn btn-primary btn-sm xp-button" onclick="closeWindow(${id})">OK</button>
            </div>
        </div>
    `;
    container.appendChild(windowDiv);
}

// Popup sur les BORDS (pour les pubs/erreurs) - Évite le centre
function createPopup(titre, message, type = 'info', customIcon = null) {
    const container = document.getElementById('popup-container');
    const windowDiv = document.createElement('div');
    const id = ++popupCounter;
    
    windowDiv.classList.add('window-xp');
    if (type === 'ad') windowDiv.classList.add('ad-popup');
    windowDiv.id = `popup-${id}`;
    
    // Position sur les BORDS en évitant le centre (zone des icônes)
    const side = Math.random();
    let x, y;
    const centerZoneX = window.innerWidth / 2;
    const centerZoneY = window.innerHeight / 2;
    
    if (side < 0.3) { // Gauche (colonne icônes exclue)
        x = 120 + Math.random() * 200; // Après les icônes
        y = Math.random() * (window.innerHeight - 300);
    } else if (side < 0.6) { // Droite
        x = window.innerWidth - 400 - Math.random() * 150;
        y = Math.random() * (window.innerHeight - 300);
    } else if (side < 0.8) { // Haut
        x = 150 + Math.random() * (window.innerWidth - 500);
        y = Math.random() * 80;
    } else { // Bas (au-dessus de la barre des tâches)
        x = 150 + Math.random() * (window.innerWidth - 500);
        y = window.innerHeight - 350 - Math.random() * 100;
    }
    
    windowDiv.style.left = `${x}px`;
    windowDiv.style.top = `${y}px`;
    
    // Icone DIVERSIFIÉE
    let iconSymbol = customIcon || 'ℹ️';
    if(!customIcon) {
        if(type === 'error') iconSymbol = ['❌', '🚫', '⛔', '💀', '☠️'][Math.floor(Math.random() * 5)];
        if(type === 'warning') iconSymbol = ['⚠️', '⚡', '🔥', '💥', '❗'][Math.floor(Math.random() * 5)];
        if(type === 'ad') iconSymbol = ['🎁', '💰', '🎉', '🎊', '💎', '🏆', '🌟'][Math.floor(Math.random() * 7)];
    }

    windowDiv.innerHTML = `
        <div class="title-bar">
            <span>${titre}</span>
            <div class="window-buttons">
                <div class="window-btn close-btn" onclick="closeWindow(${id})">✕</div>
            </div>
        </div>
        <div class="window-content">
            <div style="font-size: 32px; margin-bottom: 10px;">${iconSymbol}</div>
            <p>${message}</p>
            <div style="margin-top: 15px;">
                <button class="btn btn-primary btn-sm xp-button" onclick="closeWindow(${id})">OK</button>
            </div>
        </div>
    `;
    container.appendChild(windowDiv);
}

function closeWindow(id) {
    const win = document.getElementById(`popup-${id}`);
    if (win) win.remove();
}

function createAd(customMsg) {
    const p = pubs[Math.floor(Math.random() * pubs.length)];
    createPopup(p.title, customMsg || p.msg, "ad");
}



function startScenario() {
    if (scenarioStarted) return;
    scenarioStarted = true;
    console.log("� DÉBUT DU SCÉNARIO");

    // PHASE 1 : Quelques popups progressives (3-4 secondes)
    let compteur = 0;
    const phase1 = setInterval(() => {
        const p = pubs[Math.floor(Math.random() * pubs.length)];
        createPopup(p.title, p.msg, p.type);
        compteur++;
        
        if (compteur >= 8) { // 8 popups progressives
            clearInterval(phase1);
            console.log("⚡ PHASE 2 : EXPLOSION !");
            
            // PHASE 2 : EXPLOSION (70 popups en 2-3 secondes)
            setTimeout(() => {
                for (let i = 0; i < 70; i++) {
                    setTimeout(() => {
                        const p = pubs[Math.floor(Math.random() * pubs.length)];
                        createPopup(p.title, p.msg, 'error');
                    }, Math.random() * 2000); // Étalé sur 2 secondes
                }
                
                // PHASE 3 : Popup critique après l'explosion
                setTimeout(() => {
                    console.log("🛑 POPUP CRITIQUE");
                    createVerificationWindow();
                }, 3000); // 3 secondes après le début de l'explosion
                
            }, 2000); // Attend 2 secondes avant l'explosion
        }
    }, 500); // Une popup toutes les 500ms (phase calme)
}


function createVerificationWindow() {
    const container = document.getElementById('popup-container');
    const id = ++popupCounter;
    
    // PAS DE FOND BLOQUANT - La fenêtre est FERMABLE comme les autres
    const win = document.createElement('div');
    win.className = 'window-xp';
    win.id = `popup-${id}`;
    win.style.cssText = `
        position: fixed; left: 50%; top: 50%;
        transform: translate(-50%, -50%);
        z-index: 8000; min-width: 450px;
        box-shadow: 0 0 50px rgba(255,0,0,0.5); border: 3px solid red;
        animation: shake 0.5s infinite;
    `;
    
    win.innerHTML = `
        <div class="title-bar" style="background: linear-gradient(to bottom, #ff0000, #cc0000);">
            <span>🛡️ SÉCURITÉ CRITIQUE</span>
            <div class="window-buttons">
                <div class="window-btn close-btn" onclick="closeWindow(${id})">✕</div>
            </div>
        </div>
        <div class="window-content">
            <h3 style="color:red; margin-top:0;">⚠️ SYSTÈME VERROUILLÉ ⚠️</h3>
            <p>Veuillez prouver que vous êtes humain pour continuer.</p>
            <p style="font-size:11px;">Entrez votre date de naissance complète :</p>
            
            <input type="text" placeholder="JJ/MM/AAAA" 
                style="padding:8px; margin:20px; width:200px; text-align:center; transition: transform 0.3s;"
                onmouseover="fuirSouris(this)">
            
            <br>
            <div style="display:flex; justify-content:center; gap:10px;">
                <button class="btn btn-danger btn-sm xp-button" onclick="triggerBSOD()">Valider</button>
                <button class="btn btn-secondary btn-sm xp-button" onclick="closeWindow(${id})">Annuler</button>
            </div>
        </div>
    `;
    container.appendChild(win);
}

// Fonction pour faire fuir le champ de saisie
function fuirSouris(element) {
    const randomX = (Math.random() - 0.5) * 150; // Bouge de 150px
    const randomY = (Math.random() - 0.5) * 150;
    element.style.transform = `translate(${randomX}px, ${randomY}px)`;
}



function triggerBSOD() {
    // Cacher le bureau Windows
    document.getElementById('desktop-xp').style.display = 'none';
    
    // Afficher l'écran bleu
    const bsod = document.getElementById('bsod');
    if(bsod) {
        bsod.style.display = 'block';
    } else {
        alert("ERREUR CRITIQUE (BSOD manquant dans le HTML)");
    }
    
    // Écouter la touche Entrée pour passer à Linux
    document.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            goToLinux();
        }
    });
}

// LE PIÈGE : Formulaire avec SLIDER impossible
let sliderAttempts = 0;

function showLinuxTransitionTrap() {
    const container = document.getElementById('popup-container');
    const id = ++popupCounter;
    
    const win = document.createElement('div');
    win.className = 'window-xp';
    win.id = `popup-${id}`;
    win.style.cssText = `
        position: fixed; left: 40%; top: 30%;
        transform: translate(-50%, -50%);
        z-index: 9999; min-width: 500px;
        box-shadow: 0 0 50px rgba(255,0,0,0.8); 
        border: 4px solid #ff0000;
        animation: shake 0.5s infinite;
    `;
    
    win.innerHTML = `
        <div class="title-bar" style="background: linear-gradient(to right, #cc0000, #ff0000);">
            <span>⚠️ DÉSINSTALLATION DE WINDOWS ⚠️</span>
            <div class="window-buttons">
                <div class="window-btn close-btn" onclick="closeWindow(${id})">✕</div>
            </div>
        </div>
        <div class="window-content">
            <h3 style="color: red; margin-top: 0;">🔒 VÉRIFICATION D'IDENTITÉ REQUISE</h3>
            <p style="font-size: 12px;">Pour désinstaller Windows et passer à Linux, veuillez confirmer votre identité.</p>
            
            <div style="margin: 20px 0;">
                <label style="font-size: 11px; display: block; margin-bottom: 5px;">
                    📱 Entrez votre numéro de téléphone (avec le slider) :
                </label>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <input type="range" id="phone-slider-${id}" min="0" max="9999999999" value="0" 
                        style="flex: 1;" oninput="updatePhoneDisplay(${id})">
                    <span id="phone-display-${id}" style="font-family: monospace; font-size: 14px; min-width: 120px;">0000000000</span>
                </div>
                <p style="font-size: 9px; color: #666; margin-top: 5px;">
                    ℹ️ Cible : Votre vrai numéro de téléphone (10 chiffres)
                </p>
            </div>
            
            <div style="margin: 20px 0;">
                <label style="font-size: 11px; display: block; margin-bottom: 5px;">
                    🎂 Entrez votre date de naissance (JJ/MM/AAAA) :
                </label>
                <div style="display: flex; gap: 5px;">
                    <div style="flex: 1;">
                        <input type="range" id="day-slider-${id}" min="1" max="31" value="1" 
                            oninput="updateDateDisplay(${id})" style="width: 100%;">
                        <div style="text-align: center; font-size: 10px;">Jour: <span id="day-${id}">01</span></div>
                    </div>
                    <div style="flex: 1;">
                        <input type="range" id="month-slider-${id}" min="1" max="12" value="1" 
                            oninput="updateDateDisplay(${id})" style="width: 100%;">
                        <div style="text-align: center; font-size: 10px;">Mois: <span id="month-${id}">01</span></div>
                    </div>
                    <div style="flex: 1;">
                        <input type="range" id="year-slider-${id}" min="1950" max="2010" value="1990" 
                            oninput="updateDateDisplay(${id})" style="width: 100%;">
                        <div style="text-align: center; font-size: 10px;">Année: <span id="year-${id}">1990</span></div>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;">
                <button class="btn btn-danger btn-sm xp-button" onclick="validateLinuxTransition(${id})">
                    🚀 VALIDER ET PASSER À LINUX
                </button>
                <button class="btn btn-secondary btn-sm xp-button" onclick="closeWindow(${id})">
                    Annuler
                </button>
            </div>
        </div>
    `;
    container.appendChild(win);
}

function updatePhoneDisplay(winId) {
    const slider = document.getElementById(`phone-slider-${winId}`);
    const display = document.getElementById(`phone-display-${winId}`);
    if (slider && display) {
        const value = slider.value.padStart(10, '0');
        display.innerText = value;
    }
}

function updateDateDisplay(winId) {
    const day = document.getElementById(`day-slider-${winId}`).value.padStart(2, '0');
    const month = document.getElementById(`month-slider-${winId}`).value.padStart(2, '0');
    const year = document.getElementById(`year-slider-${winId}`).value;
    
    document.getElementById(`day-${winId}`).innerText = day;
    document.getElementById(`month-${winId}`).innerText = month;
    document.getElementById(`year-${winId}`).innerText = year;
}

function validateLinuxTransition(winId) {
    // PEU IMPORTE ce que l'utilisateur a mis, dès qu'il clique : Windows plante !
    // C'est drôle parce que ça montre que Windows ne sait même pas vérifier un formulaire
    
    closeWindow(winId);
    
    // Message "Vérification en cours..."
    const container = document.getElementById('popup-container');
    const loadingId = ++popupCounter;
    const loadingWin = document.createElement('div');
    loadingWin.className = 'window-xp';
    loadingWin.id = `popup-${loadingId}`;
    loadingWin.style.cssText = 'position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 9999;';
    
    loadingWin.innerHTML = `
        <div class="title-bar">
            <span>⏳ Vérification...</span>
        </div>
        <div class="window-content">
            <p style="text-align: center; font-size: 14px;">🔍 Vérification de vos informations...</p>
            <div style="width: 100%; background: #ddd; height: 20px; margin: 20px 0; border: 1px solid #999;">
                <div id="verify-progress" style="width: 0%; height: 100%; background: linear-gradient(to right, #0054E3, #3094F0); transition: width 0.5s;"></div>
            </div>
        </div>
    `;
    container.appendChild(loadingWin);
    
    // Animation de la barre de progression
    let progress = 0;
    const progressBar = document.getElementById('verify-progress');
    const interval = setInterval(() => {
        progress += 25;
        if (progressBar) progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            // BOUM ! Écran bleu immédiat
            closeWindow(loadingId);
            setTimeout(() => triggerBSOD(), 200);
        }
    }, 400); // 400ms * 4 = 1.6 secondes de "vérification"
}

function goToLinux() {
    // Transition directe (depuis BSOD)
    window.location.href = "../ubuntu/ubuntu.html";
}


function toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    menu.style.display = (menu.style.display === 'none') ? 'block' : 'none';
    if(!scenarioStarted) startScenario();
}

function updateClock() {
    const now = new Date();
    const clock = document.getElementById('clock');
    if(clock) clock.innerText = now.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'});
}
setInterval(updateClock, 1000);

// --- RENDRE LES FENÊTRES DÉPLAÇABLES (DRAGGABLE) ---

let isDragging = false;
let currentWindow = null;
let offset = { x: 0, y: 0 };

document.addEventListener('mousedown', (e) => {
    // Si on clique sur la barre de titre
    if (e.target.closest('.title-bar')) {
        isDragging = true;
        currentWindow = e.target.closest('.window-xp');
        
        // Mettre la fenêtre au premier plan (Z-Index)
        document.querySelectorAll('.window-xp').forEach(w => w.style.zIndex = '1000');
        currentWindow.style.zIndex = '5000';

        // Calculer l'écart souris/fenêtre
        const rect = currentWindow.getBoundingClientRect();
        offset.x = e.clientX - rect.left;
        offset.y = e.clientY - rect.top;
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging && currentWindow) {
        e.preventDefault();
        currentWindow.style.left = (e.clientX - offset.x) + 'px';
        currentWindow.style.top = (e.clientY - offset.y) + 'px';
        currentWindow.style.transform = 'none'; // Annule le translate(-50%) si présent
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    currentWindow = null;
});