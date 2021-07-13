const quizData = [
    {
        question: "Какие персонажи есть в аниме Токийский Гуль?",
        a: "Тоука",
        b: "Канеки",
        c: "Ичиго",
        correct: "b",
    },
    {
        question: "Какое аниме не про богов?",
        a: "Твое имя",
        b: "Очень приятно, бог",
        c: "Бездомный бог",
        correct: "a",
    },
    {
        question: "В каком году вышел сериал Скорпион?",
        a: "1899",
        b: "2005",
        c: "2014",
        correct: "c",
    },
    {
        question: "Какой жанр не является ЛГБТ?",
        a: "Яой",
        b: "Хентай",
        c: "Юри",
        correct: "b",
    },
    {
        question: "Какой жанр не относится к романтике?",
        a: "Спорт",
        b: "Сёдзё",
        c: "Сёнен",
        correct: "a",
    },
];

const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const submit = document.getElementById('submit');
const count_notAnswer = document.getElementById('count_notAnswer')

let currentQuiz = 0;
let score = 0;
let notAnswer = 3;
let question = 1; 

loadQuiz();

function loadQuiz(){
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    count_notAnswer.innerText = `Можно ошибиться ещё ${notAnswer} раза`;
    count_question.innerText = `Вопрос ${question} из ${quizData.length}`;
}

function deselectAnswers(){
    answerElements.forEach(answerEl => answerEl.checked = false)
}

function getSelected(){
    let answer;

    answerElements.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });

    return answer;
}

submit.addEventListener('click', () => {
    const answer = getSelected();

    if(answer){
        if(answer === quizData[currentQuiz].correct){
            score++;
        }
    else 
        {
            notAnswer--;
            
        }
        
        currentQuiz++;
        
        if(notAnswer==0)
        {
            quiz.innerHTML = `<h2>Вы сделали 3 ошибки. Провал!</h2>
            <button onclick="location.reload()">Начать сначала</button>
            `;
        }
        

        if(currentQuiz < quizData.length){
            question++;
            loadQuiz();
            
        }
        else{
            quiz.innerHTML = `<h2>Вы правильно ответили на ${score}/${quizData.length} вопросов</h2>
            <button onclick="location.reload()">Начать сначала</button>
            `;
        }
    }
});