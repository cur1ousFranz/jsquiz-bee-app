import {qArr} from './questions.js';

let questionaire = [];
let answers = [];
let index = 0;

document.querySelector('#play-btn').addEventListener('click', (e) => {
    document.querySelector('#start-play').style.display = 'none';
    document.querySelector('#quiz-container').style.display = 'block';

    e.target.style.display = 'none'
    getQuestion();
    displayQuiz();
});

document.querySelector('#restart-btn').addEventListener('click', (e) => {

    questionaire = [];
    answers = [];
    index = 0;

    
    getQuestion();
    displayQuiz();

    document.querySelector('#score-container').style.display = 'none';
    document.querySelector('#quiz-container').style.display = 'block';


});

function getQuestion(){

    while(questionaire.length !== 15){
        let index = Math.floor(Math.random() * qArr.length);
        if(questionaire.indexOf(qArr[index]) === -1){
            questionaire.push(qArr[index])
        }

    }
}

function displayQuiz(){

    // Check answers result
    if(answers.length === 15){
        
        // Make condition of result and restart
        const scoreText = document.querySelector('#score');
        const scoreContainer = document.querySelector('#score-container');
        let score = 0;
        // Counting score
        for(let i=0; i<questionaire.length; i++){

            for(let j=0; j<questionaire[i].a.length; j++){
                if(questionaire[i].a[j].text === answers[i].a){
                    if(questionaire[i].a[j].isCorrect){
                        score++;
                    }
                }
            }
        }
        
        scoreText.textContent = `${score}/15`;
        scoreContainer.style.display = '';
        document.querySelector('#quiz-container').style.display = 'none';

        questionaire = [];
        answers = [];
        index = 0;

    } else {
        
        document.querySelector('#number-question').textContent = `${index+1}/15`;
        let question = document.querySelector('#question');
        question.textContent = questionaire[index].q;


        document.querySelector('#a1').textContent = questionaire[index].a[0].text;
        document.querySelector('#a2').textContent = questionaire[index].a[1].text;
        document.querySelector('#a3').textContent = questionaire[index].a[2].text;
        document.querySelector('#a4').textContent = questionaire[index].a[3].text;

        choiceClick().then(value => {
            answers.push({a: value})
            index++;
            displayQuiz();

        })

    }
    
}

async function choiceClick(){
    let answer = '';
    let temp = new Promise(resolve => {
        let a1 = document.querySelector('#a1');
        let a2 = document.querySelector('#a2');
        let a3 = document.querySelector('#a3');
        let a4 = document.querySelector('#a4');

        a1.addEventListener('click', (e) => {
           answer = a1.textContent;
           resolve();
        });

        a2.addEventListener('click', (e) => {
            answer = a2.textContent;
            resolve();
        });

        a3.addEventListener('click', (e) => {
            answer = a3.textContent;
            resolve();
        });

        a4.addEventListener('click', (e) => {
            answer = a4.textContent;
            resolve();
        });

    });
    await temp;

    return answer;
}

