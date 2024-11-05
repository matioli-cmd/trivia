const game = document.getElementById('game')

function main(){

const question = document.getElementById("question")
const answers = document.getElementsByClassName("answer")
const score = document.getElementById("score")
const playagain = document.getElementById("playagain")
let URL = localStorage.getItem('url');
let triviaAPI;

console.log(URL)

// RESET SCORE 

score.textContent = 0

// START GAME

for(let answer of answers){
    answer.style.visibility = 'hidden'
}

async function trivia(){

        response = await fetch(URL)
        triviaAPI = await response.json()

        
}

trivia().then(() => {

    let questionNumber = 0

    triviaINFO = triviaAPI.results

    function Decode(question){
        let temporary = document.createElement('div')
        temporary.innerHTML = question
        return temporary.innerText
    }

    function ChangeQuestion(){

        question.style.visibility = 'visible'
        for(let answer of answers){
            answer.style.visibility = 'visible'
        }

        try{
            if(questionNumber != triviaINFO.length){

                let choices = []
                
                question.textContent = Decode(triviaINFO[questionNumber].question)
        
                for(let incorrect of triviaINFO[questionNumber].incorrect_answers){
                    choices.push(incorrect)
        
                }
                choices.push(triviaINFO[questionNumber].correct_answer)

                for (let i = choices.length - 1; i > 0; i--) {
                    const random_num = Math.floor(Math.random() * (i + 1));
                    [choices[i], choices[random_num]] = [choices[random_num], choices[i]];
                }

                choices.sort(() => Math.random() - 0.5)
        
                const correctAnswer = triviaINFO[questionNumber].correct_answer
        
                let i = 0
                for(let answer of answers){
        
                    answer.textContent = choices[i]
                    i++}  
                
                for(let answer of answers){
        
                    answer.onclick = function(){
                        questionNumber++
                        if(questionNumber <= triviaINFO.length){
                            
                            if(answer.textContent == correctAnswer){
                                score.textContent++
                                console.log("Correct", correctAnswer)
                                ChangeQuestion()
                            }
                            else{
                                console.log("Incorrect", correctAnswer)
                                ChangeQuestion()
                            }
                            if(questionNumber == triviaINFO.length){
                                question.style.visibility = 'hidden'
                                for(let answer of answers){
                                    answer.style.visibility = 'hidden'
                                }
                                playagain.style.display = 'block'
                                playagain.onclick = function(){
                                    window.location.href = 'index.html'
                                }
                            }
        
                        }
        
                }}
        
        
                }
        }
        catch(error){
            console.log(error)
            main()
        }



    }



ChangeQuestion()
}

)

}

if(game){
    setTimeout(() => {
        main()
    }, 2500);
}
else{
    
    submit = document.getElementById("submit")
    
    submit.onclick = function(){
        
        let API_URL = 'https://opentdb.com/api.php?type=multiple'; 
    
        const category = document.getElementById("category").value;
        const questions = document.getElementById("questions").value;
        const difficulty = document.getElementById("difficulty").value;
    
        console.log(category, questions, difficulty);
    
        if (category != 'any') {
            API_URL += `&category=${category}`;
        }
        API_URL += `&amount=${questions}`;
        API_URL += `&difficulty=${difficulty}`;
    
        localStorage.setItem('url', API_URL); 

    }
    
    
        }

