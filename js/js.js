let countspan = document.querySelector(".quiz-info .count span");
let bulletss = document.querySelector(".bullets");

let bulletsspancontainr = document.querySelector(".bullets .spans");
let quoizarea =  document.querySelector(".quiz-area");
let answerarea = document.querySelector(".answer-area");
let submit = document.querySelector(".submit-button");

let resultcontainer =  document.querySelector(".result");
let countdownspan = document.querySelector(".countdown");


let currentindex = 0 ;
let rigthans =0; 
let countdowninter;




function getquestion(){
    let request =new XMLHttpRequest();

request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200){
        // console.log(this.responseText);
        let quesoobj= JSON.parse(this.responseText);
       let qc = quesoobj.length;

       createbulletes(qc);

       // add question
       addQuestiondata(quesoobj[currentindex], qc);



       countdown(5 , qc);


       submit.onclick = () => {

        // git rigth answer 

          let therigthans = quesoobj[currentindex].right_answer ;


          currentindex++;

        checkanswer(therigthans , qc );

//remove  quoizarea
quoizarea.innerHTML = '';
answerarea.innerHTML = '';

addQuestiondata(quesoobj[currentindex], qc);

// handel bullet

handelbullet();


clearInterval(countdowninter);
countdown(5 , qc);



// show result 
showresult(qc);


       };
    }
};

    request.open("GET","question.json",true);
    request.send();

}
getquestion();


function createbulletes(num){
    countspan.innerHTML = num ;

    for (let index = 0; index <num; index++) {
        let bullet = document.createElement("span");
        bulletsspancontainr.appendChild(bullet);

        if(index === 0 ){
            bullet.className = "on";
        }
    }
}


function addQuestiondata(obj, c){
   if(currentindex < c) {
     // craete h2 
     let qtitle = document.createElement("h2")

     // craete text  
     let qtext = document.createTextNode(obj['title'])

     qtitle.appendChild(qtext);
     quoizarea.appendChild(qtitle);

    //  craate the answrs 
    for(let i =1 ; i <= 4 ; i++ ){
     let maindiv = document.createElement("div")
     maindiv.className= "answr";
     //craet radio

     let radioinput = document.createElement("input");

     // add data ,type .id ,
     radioinput.name = "questions";
     radioinput.type = "radio";
     radioinput.id= `answer_${i}`;
     radioinput.dataset.answer = obj[`answer_${i}`];

if (i === 1){
 radioinput.checked = true; 
}




     let label = document.createElement("label");
     label.htmlFor =`answer_${i}`;

      //craet labeltext

      let labeltext = document.createTextNode(obj[`answer_${i}`]);

      label.appendChild(labeltext);

      maindiv.appendChild(radioinput);

      maindiv.appendChild(label);

      
      answerarea.appendChild(maindiv);
    }
   }
}


function checkanswer(as, qc) {
    let ranse = document.getElementsByName("questions");
    let chooseanse;

    for (var i = 0; i < ranse.length; i++) {

        if (ranse[i].checked) {

            chooseanse = ranse[i].dataset.answer;
            
        }
    }
    if (as === chooseanse) {
        rigthans++;
        console.log("good answer");
    }
}

function handelbullet(){
    let bullestsspan = document.querySelectorAll(".bullets .spans span")
    let arrayossapn = Array.from(bullestsspan);
    arrayossapn.forEach((span, index) => {
        if(currentindex === index){
            span.className = "on";
        }
    });
}


function showresult(count){
    let therusult;
    if(currentindex === count){
        quoizarea.remove();
         answerarea.remove(); 
         submit.remove(); 
         bulletss.remove(); 


         if(rigthans > (count / 2 ) && rigthans < count){
            therusult = `<span class="good">Good </span> , ${rigthans} From  ${count}`;
         }else if (rigthans === count){
            therusult = `<span class="perfect">Perfect</span> , All Answer is Perfect`;
         }else{
            therusult = `<span class="bad">Bad</span> , ${rigthans} From  ${count} `;
        }
        resultcontainer.innerHTML = therusult;
    }
}


function countdown(dur , count){
    if(currentindex < count){
        let min ,sec ;
        countdowninter = setInterval( function () {
            min  = parseInt(dur/60);
            sec  = parseInt(dur % 60);


min = min < 10 ? `0${min}` : min ;
sec = sec < 10 ? `0${sec}` : sec ;





            countdownspan.innerHTML = `${min}:${sec}`;

            if (--dur < 0){
                clearInterval(countdowninter);
                submit.click();
            }
        }, 1000);
    }
}







