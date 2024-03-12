// //get slider item array 
// var sliderimage = Array.from(document.querySelectorAll('.slider-container img'))

// // get number od slides
// var sildercounter = sliderimage.length;

// // set current
// var curentslide = 1;

// //slide n e s
// var slidenumber = document.getElementById('slide-number');

// var prev = document.getElementById('prev');
// var next = document.getElementById('next');

// next.onclick = nextslide;
// prev.onclick = prevslide;


// //creat main ul li 

// var indicatorselement = document.createElement('ul');
// indicatorselement.setAttribute('id','indicator-ul');

// for (let index = 1; index <= sildercounter ; index++) {
//     var indicatorsitem = document.createElement('li');

//     indicatorsitem.setAttribute('data-index', index );

//     indicatorsitem.appendChild(document.createTextNode(index));

//     indicatorselement.appendChild(indicatorsitem);
// }
// document.getElementById('indicators').appendChild(indicatorselement);

// // creat the new ul 
// var  indicatorseul = document.getElementById('indicator-ul');


// //get   indicators slider item ul  
// var  indicatorspoltes = Array.from(document.querySelectorAll('#indicator-ul li'))

// for (let index = 0; index < indicatorspoltes.length ; index++) {
    
//     indicatorspoltes[index].onclick = function () {
//         curentslide = parseInt(this.getAttribute('data-index'));
//         check();
//     }
// }

// check();

// function nextslide(){

// if(next.classList.contains('diabled')){
//     return false

// }else{
//     curentslide++;

//     check();
// }
// }
// function prevslide(){
//     if(prev.classList.contains('diabled')){
//         return false
    
//     }else{
//         curentslide--;
    
//         check();
//     }
    
// }
// function check() {

//     slidenumber.textContent = 'Slide #' + (curentslide) + ' OF ' + (sildercounter) ;

//     removeallactice();

//     //SET ACTIVE CLASS of image 
//     sliderimage[curentslide - 1].classList.add('active')

//      //SET ACTIVE CLASS of number 
//      indicatorseul.children[curentslide - 1].classList.add('active');

// // check currentslide 
// if(curentslide == 1){
//     prev.classList.add('diabled');
// }else{
//     prev.classList.remove('diabled');
// }

// if(curentslide == sildercounter){
//     next.classList.add('diabled');
// }else{
//     next.classList.remove('diabled');
// }
// }

// //remove all actice
// function removeallactice(){
//     sliderimage.forEach(function (img) {
//         img.classList.remove('active');
//     })
//     indicatorspoltes.forEach(function (polt) {
//         polt.classList.remove('active');
//     })
// }

//end p 1





let input = document.querySelector(".get-repo input");
let buttern = document.querySelector(".get-button");
let responsedata = document.querySelector(".show-data");

buttern.onclick= function () {
    getrepos();
};


//get repos funcation 
function getrepos(){
  if (input.value == ""){
    responsedata.innerHTML = "<span> Please write github Username</span>";
  }
  else{
    fetch(`https://api.github.com/users/${input.value}/repos`)
    .then((res) =>{
        return res.json();
    }) .then((data) =>{
        responsedata.innerHTML = " ";

        //loop on  data
        data.forEach(repo => {
            // console.log(repo.name)
            //create main ele

            let maindiv = document.createElement("div");

            //create reop ele

            let reponame = document.createTextNode(repo.name);
            maindiv.appendChild(reponame);


            //create reop url
            let urldiv = document.createElement("a");
           // create reop url text
            let urltext = document.createTextNode("Visit");

            urldiv.appendChild(urltext);
           
            // add hyper text   https://walaaali782.github.io/github-username/
            urldiv.href = `https://github.com/${input.value}/${repo.name}/`;
            // set attripute blank
            urldiv.setAttribute('targrt','_blank')
            maindiv.appendChild(urldiv);


            
   //create reop size
   let sizediv = document.createElement("p");
   // create reop url text
    let sizetext = document.createTextNode(`Size of Repo ${repo.size}`);
    sizediv.appendChild(sizetext);
    maindiv.appendChild(sizediv);

  //createstars count 
  let stars = document.createElement("span");
  // create star text
   let startext = document.createTextNode(`Stars of  ${repo.stargazers_count}`);
   stars.appendChild(startext);
   maindiv.appendChild(stars);


// add class on main div 
maindiv.className = 'repo-box';



responsedata.appendChild(maindiv);


});
    });
  }
}


