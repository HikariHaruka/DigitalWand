//Список вопросов и ответов
const quizData = [
    {
        question: "Какие персонажи есть в аниме Токийский Гуль?",
        a: "Тоука",
        b: "Канеки",
        c: "�?чиго",
        variant: "checkbox",
        correct:["a","b"]
    },
    {
        question: "Какое аниме не про богов?",
        a: "Твое имя",
        b: "Очень приятно, бог",
        c: "Бездомный бог",
        variant: "radio",
        correct: "a"
    },
    {
        question: "В каком году вышел сериал Скорпион?",
        a: "1899",
        b: "2005",
        c: "2014",
        variant: "radio",
        correct: "c"
    },
    {
        question: "Какой жанр в аниме с рейтингом 18+ относится к геям?",
        variant: "text",
        correct: ["яой","yaoi"]
    },
    {
        question: "Какой жанр относится к романтике?",
        a: "Спорт",
        b: "Сёдзё",
        c: "Сёнен",
        variant: "checkbox",
        correct: ["b","c"]
    }
];

//Получаем элементы в переменные
const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');

const divCheckbox = document.getElementById('divCheckbox');
const divRadio = document.getElementById('divRadio');
const divText = document.getElementById('divText');

const questionElement = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const text = document.getElementById('text');

const back = document.getElementById('back');
const submit = document.getElementById('submit');

const count_question=document.getElementById('count_question');
const count_notAnswer = document.getElementById('count_notAnswer');

//Объявляем нужные нам переменные
let currentQuiz = 0;
let score = 0;
let notAnswer = 3;
let question = 1; 
let text_Answer = `Можно ошибиться ещё ${notAnswer} раза`;

loadQuiz();

//Функция загрузки вопросов и вариантов ответа
function loadQuiz()
{
    deselectAnswers();
    
    const currentQuizData = quizData[currentQuiz];
    const variant = currentQuizData.variant;
    return variant;
    if(variant === "radio")
    {
        divRadio.style.display = 'block';
        divCheckbox.style.display = 'none';
        divText.style.display = 'none';
        questionElement.innerText = currentQuizData.question;
        a_text.innerText = currentQuizData.a;
        b_text.innerText = currentQuizData.b;
        c_text.innerText = currentQuizData.c;
    }
    else if( variant === "checkbox")
    {
        divCheckbox.style.display = 'block';
        divText.style.display = 'none';
        divRadio.style.display = 'none';
        questionElement.innerText = currentQuizData.question;
        a_text.innerText = currentQuizData.a;
        b_text.innerText = currentQuizData.b;
        c_text.innerText = currentQuizData.c;
    }
    else if (variant === "text")
    {
        divText.style.display = 'block';
        divCheckbox.style.display = 'none';
        divRadio.style.display = 'none';
        questionElement.innerText = currentQuizData.question;
        
    }
    count_notAnswer.innerText = text_Answer;
    count_question.innerText = `Вопрос ${question} из ${quizData.length}`;
    
}

//Функция отмены выделенных checkbox
function deselectAnswers()
{
    answerElements.forEach(answerEl => answerEl.checked = false);
}

//Получаем выбранный ответ
function getSelected()
{
    let answer;
    let textSel;
    const variant = loadQuiz();
    if(variant==="radio" || variant==="checkbox")
    {
        answerElements.forEach(answerEl => 
        {
            if(answerEl.checked)
            {
                answer = answerEl.id;
            }
        });

        return answer;
    }
    else if (variant==="text")
    {
        textSel = text.value;
        return textSel;
    }
}

//Действия при нажатии кнопки Назад
back.addEventListener('click', () => 
{
    currentQuiz--;
    
    if(currentQuiz > -1)
    {
        question--;
        loadQuiz();
    }
});

//Действия при нажатии кнопки Далее
submit.addEventListener('click', () => 
{
    const answer = getSelected(answer);
    const textSel = getSelected(textSel);
    const variant = loadQuiz();

    //Проверка правильности ответов
    
    if(answer)
    {
        if (variant==="checkbox")
        {
            if(answer[0] === quizData[currentQuiz].correct[0] && answer[1] === quizData[currentQuiz].correct[1])
                {
                    score++;
                }
            else 
                {
                    notAnswer--;

                }
        }
        else if(variant==="radio")
        {
            if(answer === quizData[currentQuiz].correct)
                {
                    score++;
                }
            else 
                {
                    notAnswer--;

                }
        }
        else if(variant==="text")
        {
            if(textSel === quizData[currentQuiz].correct[0] || textSel === quizData[currentQuiz].correct[1])
                {
                    score++;
                }
            else 
                {
                    notAnswer--;

                }
        }

        currentQuiz++;
            
        //Проверка на количество вопросов
        if(notAnswer>1)
        {
            text_Answer = `Можно ошибиться ещё ${notAnswer} раза`;
        }
        else if(notAnswer === 1)
        {
            text_Answer = `Можно ошибиться ещё ${notAnswer} раз`;
        }
        else if(notAnswer === 0)
        {
            quiz.innerHTML = `<h2>Вы сделали 3 ошибки. Провал!</h2>
                <button onclick="location.reload()">Начать сначала</button>
                `;
        }

        //Загрузка следующего вопроса
        if(currentQuiz < quizData.length)
        {
            question++;
            loadQuiz();
        }
        //�?тог опроса
        else
        {
            quiz.innerHTML = `<h2>Вы правильно ответили на ${score}/${quizData.length} вопросов</h2>
                <button onclick="location.reload()">Начать сначала</button>
                `;
        }
    
    }
});