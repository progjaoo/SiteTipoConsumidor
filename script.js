const questions = [
    {
        question: "Como você se sente ao ver uma promoção tentadora?",
        options: [
            "Pesquiso se realmente preciso do produto.",
            "Compro na hora, a promoção é irresistível!",
            "Avalio, mas só se for algo que eu realmente queira."
        ]
    },
    {
        question: "Você costuma fazer uma lista de compras?",
        options: [
            "Sempre! Isso me ajuda a não gastar demais.",
            "Às vezes, mas sempre acabo comprando coisas que não estavam na lista.",
            "Não, prefiro ver o que preciso no momento."
        ]
    },
    {
        question: "Quando você deseja algo caro, o que faz?",
        options: [
            "Penso se é realmente necessário e busco opções.",
            "Compro logo, a vontade é mais forte!",
            "Pesquiso um pouco, mas acabo decidindo na hora."
        ]
    },
    {
        question: "Como você lida com compras por impulso?",
        options: [
            "Tento resistir e penso se realmente preciso.",
            "Não consigo resistir e compro!",
            "Faço uma pausa, mas muitas vezes compro mesmo assim."
        ]
    },
    {
        question: "Você costuma comparar preços antes de comprar?",
        options: [
            "Sim, sempre faço pesquisa de preços.",
            "Não, compro onde aparece.",
            "Às vezes, mas não me aprofundar muito."
        ]
    },
    {
        question: "Você controla seus gastos mensais?",
        options: [
            "Sim, mantenho um orçamento rigoroso.",
            "Não, gasto conforme a vontade.",
            "Faço um controle básico, mas não sou muito rigoroso."
        ]
    },
    {
        question: "Como você se sente sobre comprar marcas conhecidas?",
        options: [
            "Gosto de saber que estou pagando pelo que vale.",
            "Se for mais caro, melhor, quero o que é mais badalado.",
            "Depende do produto, mas não sou muito exigente."
        ]
    },
    {
        question: "Você costuma aproveitar eventos de liquidação?",
        options: [
            "Vou, mas só se for para algo que realmente preciso.",
            "Não perco uma! Gosto de aproveitar as ofertas.",
            "Vou, mas acabo comprando coisas que não precisava."
        ]
    },
    {
        question: "Quando você ganha um dinheiro extra, o que faz?",
        options: [
            "Penso em investir ou guardar.",
            "Compro algo que estava querendo há tempos.",
            "Faço algo que me traga prazer, como sair para jantar."
        ]
    },
    {
        question: "Qual é sua atitude em relação a compras online?",
        options: [
            "Pesquiso bem antes de comprar.",
            "Compro de imediato, a facilidade me tenta!",
            "Às vezes pesquiso, mas também me deixo levar pelas ofertas."
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const options = document.querySelectorAll(".option");
    
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    options.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
        option.classList.remove("selected"); 
        option.onclick = () => selectOption(index); 
    });

    document.getElementById("nextButton").style.display = 'none';
    updateProgress();
}

function selectOption(index) {
    const options = document.querySelectorAll(".option");
    options.forEach(option => option.classList.remove('selected'));

    options[index].classList.add('selected');

    score += (index === 0) ? 3 : (index === 1) ? 1 : 2;

    document.getElementById("nextButton").style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const resultElement = document.getElementById("result");
    let resultText = '';

    if (score >= 26) {
        resultText = "Consumidor Consciente! Você é um planejador e sempre considera suas necessidades antes de comprar.";
    } else if (score >= 16) {
        resultText = "Consumidor Impulsivo! Você tende a comprar por impulso e a se deixar levar por emoções.";
    } else {
        resultText = "Pão Duro! Você é extremamente cauteloso e evita gastar.";
    }

    document.querySelector(".container").innerHTML = `
        <h2>${resultText}</h2>
        <button class="restart" onclick="restartQuiz()">Reiniciar</button>
    `;
}

function updateProgress() {
    const progress = document.getElementById("progress");
    const percentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progress.style.width = `${percentage}%`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.querySelector(".container").innerHTML = `
        <h1 id="userName">Teste: Que tipo de consumidor eu sou?</h1>
        <div class="progress-bar">
            <div class="progress" id="progress"></div>
        </div>
        <div class="question" id="question"></div>
        <div class="options">
            <button class="option">A</button>
            <button class="option">B</button>
            <button class="option">C</button>
        </div>
        <button class="next" id="nextButton" onclick="nextQuestion()">Próxima</button>
        <div class="result" id="result"></div>
    `;
    loadQuestion();
}

loadQuestion();