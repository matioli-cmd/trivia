const game = document.getElementById('game')
let loadingInterval;

function main(){

const question = document.getElementById("question")
const answers = document.getElementsByClassName("answer")
const score = document.getElementById("score")
const scoreholder = document.getElementById("scoreholder")
const playagain = document.getElementById("playagain")
const results = document.getElementById("results")
const resultstext = document.getElementById("resultstext")
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
    

        try{
            if(triviaAPI.results[0].question){
                
            clearInterval(loadingInterval)
        
            let questionNumber = 0

            let correct = []
            let answers_chosen = []
        
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
                scoreholder.style.visibility = 'visible'
                score.style.visibility = 'visible'
            
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
        
                    answer.textContent = Decode(choices[i])
                    i++}  
                
                for(let answer of answers){
        
                    answer.onclick = function(){
                        questionNumber++
                        answers_chosen.push(answer.textContent)
                        console.log(answers_chosen)
                        if(questionNumber <= triviaINFO.length){
                            
                            if(answer.textContent == correctAnswer){
                                score.textContent++
                                correct.push(question.textContent)

                                ChangeQuestion()
                                console.log(correct)
                            }
                            else{
                                console.log("Incorrect", correctAnswer)
                                console.log(correct)

                                ChangeQuestion()
                            }
                            if(questionNumber == triviaINFO.length){
                                question.style.display = 'none'
                                for(let answer of answers){
                                    answer.style.visibility = 'hidden'
                                }
                                playagain.style.display = 'block'
                                score.style.display = 'none'
                                scoreholder.style.display = 'none'

                                resultstext.style.display = 'block'

                                const final_score = document.createElement("h1")
                                final_score.textContent = `Final score: ${score.textContent}/${triviaINFO.length}`
                                final_score.style.fontSize = '30px'
                                results.append(final_score)
                                const line = document.createElement("hr")
                                line.style.height = '10px'
                                line.style.backgroundColor = 'white'
                                results.append(line)
                                results.innerHTML += '<br>'

                                let question_num = 1
                                for(i = 0; i < triviaINFO.length; i++){
                                    if(correct.includes(Decode(triviaINFO[i].question))){
                                        const question = document.createElement("h1")
                                        const answer = document.createElement("p")
                                        answer.textContent = Decode(triviaINFO[i].correct_answer)
                                        question.style.fontSize = '25px'
                                        question.style.color = 'rgb(63, 172, 67)'
                                        question.textContent = `${question_num}. ${Decode(triviaINFO[i].question)}`
                                        results.append(question)
                                        results.append(answer)
            
                                        question_num++

                                    }
                                    else{
                                        const question = document.createElement("h1")
                                        const answer = document.createElement("p")
                                        const yourAnswer = document.createElement('p')
                                        yourAnswer.textContent = `Your answer: ${answers_chosen[i]}`
                                        answer.textContent = `Correct answer: ${Decode(triviaINFO[i].correct_answer)}`
                                        question.style.fontSize = '25px'
                                        question.style.color = 'rgb(193, 71, 71)'
                                        question.textContent = `${question_num}. ${Decode(triviaINFO[i].question)}`
                                        results.append(question)
                                        results.append(yourAnswer)
                                        results.append(answer)
                                        
                                        question_num++
            
                                    }

                
                
                                }
                                results.append(line)
                                results.innerHTML += '<br>'


                                playagain.onclick = function(){
                                    window.location.href = 'index.html'
                                }
                            }
        
                        }
        
                }}
        
        
                }
        }


    }
    else{
        console.log("Empty")
    }



ChangeQuestion()
}
catch(error){
    console.log(error)
    question.textContent = 'Loading'
    
    loadingInterval = setInterval(() => {
        if(question.textContent == 'Loading...'){
            question.textContent = 'Loading'
        }
        else{
            question.textContent += '.'
        }
    }, 1000)
    
    for(let answer of answers){
        answer.style.visibility = 'hidden'
    }
    scoreholder.style.visibility = 'hidden'
    score.style.visibility = 'hidden'
    setTimeout(() => {
        clearInterval(loadingInterval)
        main()
     }, 5000);
}

})}

    


if(game){
    
    loadingInterval = setInterval(() => {
        if(question.textContent == 'Loading...'){
            question.textContent == 'Loading'
        }
        else{
            question.textContent += '.'
        }
    }, 1000)
    setTimeout(() => {
       clearInterval(loadingInterval)
       main()
    }, 5000);
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

        window.location.href = 'game.html'


    }
    
    
        }

