const game = document.getElementById('game')

function main(){

const question = document.getElementById("question")
const answers = document.getElementsByClassName("answer")
const score = document.getElementById("score")
const playagain = document.getElementById("playagain")
let URL = JSON.parse(localStorage.getItem('url'));
let triviaAPI;

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

    function ChangeQuestion(){

        question.style.visibility = 'visible'
        for(let answer of answers){
            answer.style.visibility = 'visible'
        }

        try{
            if(questionNumber != triviaINFO.length){

                let choices = []
                
                question.textContent = triviaINFO[questionNumber].question
        
                // CHOICES //
        
                for(let incorrect of triviaINFO[questionNumber].incorrect_answers){
                    choices.push(incorrect)
        
                }
                choices.push(triviaINFO[questionNumber].correct_answer)
        
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
        catch{
            main()
        }



    }



ChangeQuestion()
}

)

}

if(game){
    console.log("Yes game")
    main()
}
else{
    submit = document.getElementById("submit")
    
    setTimeout(() => {
        submit.onclick = function(){

            let API_URL = 'https://opentdb.com/api.php?type=multiple'
    
            const category = document.getElementById("category").value
            const questions = document.getElementById("questions").value
            const difficulty = document.getElementById("difficulty").value
    
            console.log(category, questions, difficulty)
    
            if(category != 'any'){
                API_URL += `&category=${category}`
            }
            API_URL += `&amount=${questions}`
            API_URL += `&difficulty=${difficulty}`
    
            localStorage.setItem('url', JSON.stringify(API_URL));
    
        }
    }, 2000);

}
