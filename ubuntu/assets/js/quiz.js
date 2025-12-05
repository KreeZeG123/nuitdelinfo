const quiz = [
    {
        q: "Quand apparaît pour la première fois l’obsolescence programmée ?",
        options: ["En 1920 avec le Cartel Phœbus", "En 2007 avec l’iPhone", "Au 17e siècle"],
        answer: 0
    },
    {
        q: "Les GAFAM nous contrôlent-ils ?",
        options: ["Non, jamais", "Oui, via les algorithmes et nos données", "Seulement le week-end"],
        answer: 1
    },
    {
        q: "Sommes-nous libres avec nos smartphones ?",
        options: ["Oui", "Non, nos choix sont influencés", "Seulement le soir"],
        answer: 1
    },
    {
        q: "Pourquoi Linux est mieux que Windows ?",
        options: ["Plus libre et privé", "Il donne des jeux gratuits", "Parce qu’il est vert"],
        answer: 0
    },
    {
        q: "Qu’est-ce que la dépendance numérique ?",
        options: ["Utiliser un chargeur cassé", "Besoin compulsif d’utiliser son smartphone", "Avoir 2 écrans"],
        answer: 1
    },
    {
        q: "Comment les écoles luttent contre la dépendance numérique ?",
        options: ["Supprimer Internet", "Limiter smartphones + sensibilisation", "Donner un iPad"],
        answer: 1
    },
    {
        q: "Quel est l’impact écologique du numérique ?",
        options: ["Aucun", "Pollution + déchets électroniques", "Juste TikTok"],
        answer: 1
    },
    {
        q: "Qu’est-ce que l’obsolescence programmée ?",
        options: ["Faire durer un produit 100 ans", "Rendre les produits volontairement moins durables", "Ajouter des jeux gratuits"],
        answer: 1
    },
    {
        q: "Comment lutter contre l’obsolescence programmée ?",
        options: ["Réparer + recycler + durable", "Acheter plus", "Ignorer le problème"],
        answer: 0
    }
];

let currentQuestion = 0;

function loadQuestion() {
    const q = quiz[currentQuestion];

    const questionEl = document.getElementById("quiz-question");
    const optionsEl = document.getElementById("quiz-options");
    const feedbackEl = document.getElementById("quiz-feedback");

    if (!questionEl || !optionsEl || !feedbackEl) return;

    questionEl.innerText = q.q;
    feedbackEl.innerText = "";

    let html = "";
    q.options.forEach((opt, index) => {
        html += `
            <button onclick="checkAnswer(${index})"
                style="display:block; width:100%; margin:8px 0; padding:10px; border:1px solid #0054E3; background:white; border-radius:5px; cursor:pointer; text-align:left;">
                ${opt}
            </button>
        `;
    });

    optionsEl.innerHTML = html;
}

function checkAnswer(selected) {
    const feedbackEl = document.getElementById("quiz-feedback");
    if (!feedbackEl) return;

    const goodIndex = quiz[currentQuestion].answer;
    const goodAnswer = quiz[currentQuestion].options[goodIndex];

    if (selected === goodIndex) {
        feedbackEl.style.color = "green";
        feedbackEl.innerText = "✔ Bonne réponse !";
    } else {
        feedbackEl.style.color = "red";
        feedbackEl.innerHTML = `❌ Mauvaise réponse.<br>
        👉 La bonne réponse était : <strong>${goodAnswer}</strong>`;
    }
}


function nextQuestion() {
    currentQuestion++;
    const container = document.getElementById("quiz-container");

    if (!container) return;

    if (currentQuestion >= quiz.length) {
        container.innerHTML = `
            <h2>🎉 Quiz terminé !</h2>
            <p>Bravo, tu as survécu au quiz numérique 😼</p>
        `;
        return;
    }

    loadQuestion();
}

// Lancer le quiz directement (le script est chargé après le HTML)
loadQuestion();

