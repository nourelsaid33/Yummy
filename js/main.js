const Url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const row = document.getElementById("row");
var navLinks=document.querySelectorAll(".nav-link")
const inputContainer = document.getElementById("search-inputs");

  
var submitBtn=document.getElementById("submitBtn")   
var emailError=document.getElementById("emailError")
var nameError=document.getElementById("nameError")
var phoneError=document.getElementById("phoneError") 
var passwordError=document.getElementById("passwordError")     
var repasswordError=document.getElementById("repasswordError")     
var ageError=document.getElementById("ageError")   





const barsIcon = document.querySelector(".bars");
const closeIcon = document.querySelector(".close");
const menuContainer = document.querySelector(".menu");
const navItems = document.querySelectorAll(".list_items .nav-item");

  barsIcon.addEventListener("click", function () {
  menuContainer.classList.add("active");
  closeIcon.classList.remove("d-none");
  barsIcon.classList.add("d-none");

  // Animate nav items
  navItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("animate");
    }, index * 100);
  });
});


closeIcon.addEventListener("click", function () {
  menuContainer.classList.remove("active");
  barsIcon.classList.remove("d-none");
  closeIcon.classList.add("d-none");

  navItems.forEach(item =>
     item.classList.remove("animate"));
});



navItems.forEach(item => {
  item.addEventListener("click", () => {
      menuContainer.classList.remove("active");
      barsIcon.classList.remove("d-none");
      closeIcon.classList.add("d-none");
      navItems.forEach(nav => nav.classList.remove("animated"));
  });
});









var allMeals=[];
var  allMealDetail=[]
var allCategories=[];
var allMealsCategories=[];
var allAreas=[];
var allAreasMeals=[];
var allIngredients=[];
var allIngredientsMeals=[];
var allSearchMeal=[];
var allSearchDetail=[]
var allCategoryDetail=[]
var allAreaDetail=[]
var allIngredientDetail=[]

async function allMealsData(){
  const req = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
      const response = await req.json();
       allMeals = response.meals;
       displayMeals()
       console.log(allMeals)
}

function displayMeals(){
  var cartona=``
  for(var i=0 ; i< 20;i++){
    
    cartona+=`
    <div class="col-md-3 pb-4">
      <div class="meal-card" data-category="${allMeals[i].idMeal}">
             <img src="${allMeals[i].strMealThumb}" alt="${allMeals[i].strMeal}" class="meal-img w-100 rounded-2"/>
              <div class="layer">
               <h3 class="text-center pt-5 mt-5">${allMeals[i].strMeal}</h3>
              </div>
       </div>
    </div>
       `
  }
  row.innerHTML=cartona;

  const cards=document.querySelectorAll(".meal-card")
  for (let i = 0; i < cards.length; i++) {
     cards[i].addEventListener("click", function () {
    
    var selectedMeal = this.getAttribute("data-category");
    console.log(selectedMeal)
    mealDetails(selectedMeal); 
  });
}
}
allMealsData()

 async function mealDetails(word){
   try{
  const req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${word}`);
  const response = await req.json();
    allMealDetail = response.meals;
   displayMealDetail()
  console.log(allMealDetail);
  }catch(error){
         console.error(error)
  }

  
  
 }

 function displayMealDetail(){
  var cartona=``
  for(var i=0 ; i<allMealDetail.length; i++){

 
    let ingredientsList = ``;
    for (let j = 1; j <= 20; j++) {
      const ingredient =allMealDetail[i][`strIngredient${j}`];
      const measure = allMealDetail[i][`strMeasure${j}`];
        if(ingredient!=="" && measure!==""){
        ingredientsList += `<li class="badge bg-secondary m-1 p-2">${measure} ${ingredient}</li>`;
        }
    }



    cartona+=`
    <div class="d-flex">
    <div class="col-md-5">
       <img src="${allMealDetail[i].strMealThumb}" alt="" class="meal-img w-75 rounded-2">
       <br>
       <span class="text-white fs-2">${allMealDetail[i].strMeal}</span>
     </div>  
     <div class="col-md-7 text-white gx-0">   
     <span class="fs-1">instructions</span>
       <p class="gx-0">${allMealDetail[i].strInstructions}</p>
       <span class="fs-2 mb-1">Area: ${allMealDetail[i].strArea}</span "> <br>
      <span class="fs-2 mb-1">Category: ${allMealDetail[i].strCategory}</span "> <br>
      <span class="fs-4 mb-1">Recipes: </span "><br>
      <div>${ingredientsList}</div>
       <span class="fs-2 mb-1">Tags:</span>
       <div class="mb-5">
       <button class="btn btn-success" onclick="window.open('${allMealDetail[i].strSource}','_blank')">Source</button>
       <button class="btn btn-danger" onclick="window.open('${allMealDetail[i].strYoutube}','_blank')">Youtube</button>
       </div>

    </div>  
    </div> 
    `
  }
  row.innerHTML=cartona
 }
 




//&& search ///////////////////////////////////////////////////////////////////////////////////


async function searchMeal(){
   const  nameValue = document.getElementById("name").value;
   const letterValue = document.getElementById("letter").value;

  var url = "";

  if (nameValue !== "") {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nameValue}`;
  } 

    if (letterValue !== "" && letterValue.length === 1) {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letterValue}`;
    } 
    
  
  

  try {
    const req = await fetch(url);
    const response = await req.json();
    allSearchMeal = response.meals; 
    displaySearchData();
    console.log(allSearchMeal)
  } catch (error) {
    console.error(error);
  }
}


function displaySearchData(){

   var cartona=``
  for(var i=0 ; i< allSearchMeal.length ; i++){
    cartona+=`

    <div class="col-md-3 pb-4">
      <div class="category-card" data-category="${allSearchMeal[i].idMeal}">
             <img src="${allSearchMeal[i].strMealThumb}" alt="" class="meal-img w-100 rounded-2"/>
              <div class="layer">
               <h3 class="text-center pt-5 mt-5">${allSearchMeal[i].strMeal}</h3>
              </div>
       </div>
    </div>
       `
       
}row.innerHTML=cartona;

const cards=document.querySelectorAll(".category-card")
  for (let i = 0; i < cards.length; i++) {
     cards[i].addEventListener("click", function () {
    
    var selectedMeal = this.getAttribute("data-category");
    console.log(selectedMeal)
     searchDetails(selectedMeal); 
  });
}
}

function searchInput(){
  const inputContainer = document.getElementById("search-inputs");

  inputContainer.innerHTML = `
    <div class="container">
      <div class="d-flex ms-5 mt-2">
        <div class="col-md-5 mt-2 mb-3 mx-4">
          <input type="text" class="form-control" id="name" placeholder="Search by Name">
        </div>
        <div class="col-md-5 mt-2 mb-3 mx-4">
          <input type="text" class="form-control" id="letter" placeholder="Search by First Letter">
        </div>
      </div>
    </div>
  `;
     row.innerHTML=""
     var nameValue=document.getElementById("name")
     var letterSearch=document.getElementById("letter")

    nameValue.addEventListener("input", () => {
    letterSearch.value = ""; 
    searchMeal();
  });

  letterSearch.addEventListener("input", () => {
    nameValue.value = ""; 
    searchMeal();
  });
  
}
async function searchDetails(word){
   try{
  const req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${word}`);
  const response = await req.json();
    allSearchDetail = response.meals;
   displaySearchDetail()
  console.log(allSearchDetail);
  }catch(error){
         console.error(error)
  }

  
  
 }

 function displaySearchDetail(){
  var cartona=``
  for(var i=0 ; i< allSearchDetail.length; i++){

 
    let ingredientsList = ``;
    for (let j = 1; j <= 20; j++) {
      const ingredient = allSearchDetail[i][`strIngredient${j}`];
      const measure = allSearchDetail[i][`strMeasure${j}`];
      if(ingredient !==""||measure!==""){
        ingredientsList += `<li class="badge bg-secondary m-1 p-2">${measure} ${ingredient}</li>`;
      }
    }



    cartona+=`
    <div class="d-flex">
    <div class="col-md-5">
       <img src="${allSearchDetail[i].strMealThumb}" alt="" class="meal-img w-75 rounded-2">
       <br>
       <span class="text-white fs-2">${allSearchDetail[i].strMeal}</span>
     </div>  
     <div class="col-md-7 text-white gx-0">   
     <span class="fs-1">instructions</span>
       <p class="gx-0">${allSearchDetail[i].strInstructions}</p>
       <span class="fs-2 mb-1">Area: ${allSearchDetail[i].strArea}</span "> <br>
      <span class="fs-2 mb-1">Category: ${allSearchDetail[i].strCategory}</span "> <br>
       <span class="fs-4 mb-1">Recipes:</span "><br>
       <div> ${ingredientsList}</div>
       <span class="fs-2 mb-1">Tags:</span>
       <div class="mb-5">
       <button class="btn btn-success" onclick="window.open('${allSearchDetail[i].strSource}','_blank')">Source</button>
       <button class="btn btn-danger" onclick="window.open('${allSearchDetail[i].strYoutube}','_blank')">Youtube</button>
       </div>

    </div>  
    </div> 
    `
  }
  row.innerHTML=cartona
  inputContainer.innerHTML=""
 }
 
// &&category ////////////////////////////////////////////////////////////////////////////////////////////
async function allCategoriesData(){
  const req = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  const response = await req.json();
   allCategories = response.categories;
   displayCategories()
  console.log(allCategories);
}

function displayCategories(){
  var cartona=``
  for(var i=0 ; i< allCategories.length ; i++){
    cartona+=`
    <div class="col-md-3 pb-4">
      <div class="category-card" data-category="${allCategories[i].strCategory}">
             <img src="${allCategories[i].strCategoryThumb}" alt="" class="meal-img w-100 rounded-2"/>
              <div class="layer">
               <h3 class="text-center pt-5 mt-5">${allCategories[i].strCategory}</h3>
               <p class="text-center">${allCategories[i].strCategoryDescription.split(' ').slice(0,20).join(' ')}</p>
              </div>
       </div>
    </div>
       `
  }
  row.innerHTML=cartona;
  inputContainer.innerHTML =""
 

 const Cards = document.querySelectorAll(".category-card");

  for (let i = 0; i < Cards.length; i++) {
     Cards[i].addEventListener("click", function () {
    
    const selectedCategory = this.getAttribute("data-category");
    console.log(selectedCategory)
    allMealsCategory(selectedCategory); 
  });
}
  
}



async function allMealsCategory(word){
  try{
  const req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${word}`);
  const response = await req.json();
   allMealsCategories = response.meals;
   displayAllMealCategory()
  console.log(allMealsCategories);
  }catch(error){
         console.error(error)
  }
  
}

function displayAllMealCategory(){
    var cartona=``
  for(var i=0 ; i<  allMealsCategories.length ; i++){
    cartona+=`
    <div class="col-md-3 pb-4">
      <div class="category-card" data-category="${ allMealsCategories[i].idMeal}">
             <img src="${ allMealsCategories[i].strMealThumb}" alt="" class="meal-img w-100 rounded-2"/>
              <div class="layer">
               <h3 class="text-center pt-5 mt-5">${ allMealsCategories[i].strMeal}</h3>
              </div>
       </div>
    </div>
       `
  }
  row.innerHTML=cartona;
   inputContainer.innerHTML =""

   const cards=document.querySelectorAll(".category-card")
  for (let i = 0; i < cards.length; i++) {
     cards[i].addEventListener("click", function () {
    
    var selectedMeal = this.getAttribute("data-category");
    console.log(selectedMeal)
     categoryDetails(selectedMeal); 
  });
}

}

 async function categoryDetails(word){
   try{
  const req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${word}`);
  const response = await req.json();
    allCategoryDetail = response.meals;
   displayCategoryDetail()
  console.log(allCategoryDetail);
  }catch(error){
         console.error(error)
  }

  
  
 }

 function displayCategoryDetail(){
  var cartona=``
  for(var i=0 ; i<allCategoryDetail.length; i++){

 
   var ingredientsList = ``;
    
    
    for (var j = 1; j <= 20; j++) {
      var ingredient = allCategoryDetail[i][`strIngredient${j}`];
       var measure = allCategoryDetail[i][`strMeasure${j}`];
      if(ingredient !==""||measure!==""){
         ingredientsList +=`
          <div class="badge bg-info m-1 p-2">${measure} ${ingredient}</div>`
      }
    }



    cartona+=`
    <div class="d-flex">
    <div class="col-md-5">
       <img src="${allCategoryDetail[i].strMealThumb}" alt="" class="meal-img w-75 rounded-2">
       <br>
       <span class="text-white fs-2">${allCategoryDetail[i].strMeal}</span>
     </div>  
     <div class="col-md-7 text-white gx-0">   
     <span class="fs-1">instructions</span>
       <p class="gx-0">${allCategoryDetail[i].strInstructions}</p>
       <span class="fs-2 mb-1">Area: ${allCategoryDetail[i].strArea}</span "> <br>
      <span class="fs-2 mb-1">Category: ${allCategoryDetail[i].strCategory}</span "> <br>
       <span class="fs-4 mb-1">Recipes: </span "><br>
       <div>${ingredientsList}</div>
       <span class="fs-2 mb-1">Tags:</span>
       <div class="mb-5">
       <button class="btn btn-success" onclick="window.open('${allCategoryDetail[i].strSource}','_blank')">Source</button>
       <button class="btn btn-danger" onclick="window.open('${allCategoryDetail[i].strYoutube}','_blank')">Youtube</button>
       </div>

    </div>  
    </div> 
    `
  }
  row.innerHTML=cartona
 }
// && area/////////////////////////////////////////////////////////////////////////////////////
async function allAreasData(){
const req = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
  const response = await req.json();
   allAreas = response.meals;
  displayAllAreas()
}

function displayAllAreas(){
    var cartona=``
  for(var i=0 ; i< allAreas.length ; i++){
    cartona+=`
    <div class="col-md-3 pb-4">
      <div class="area-card text-white d-flex flex-column text-center" data-area="${allAreas[i].strArea}">
           <i class="fa-solid fa-house-laptop fs-1"></i>
           <h3 class="text-center">${allAreas[i].strArea}</h3>
             
       </div>
    </div>
       `
  }
  row.innerHTML=cartona;
   inputContainer.innerHTML =""



  const areaCards = document.querySelectorAll(".area-card");

  for (let i = 0; i < areaCards.length; i++) {
     areaCards[i].addEventListener("click", function () {
    
    const selectedArea = this.getAttribute("data-area");
    console.log(selectedArea)
    allAreaMeals(selectedArea); 
  });
}
}



async function allAreaMeals(word){
  try{
  const req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${word}`);
  const response = await req.json();
   allAreasMeals = response.meals;
  displayAllAreaMeals()
  console.log(allAreasMeals);
  }catch(error){
     console.error(error)
  }
  
}

function displayAllAreaMeals(){
    var cartona=``
  for(var i=0 ; i<  allAreasMeals.length ; i++){
    cartona+=`
    <div class="col-md-3 pb-4">
      <div class="category-card" data-category="${ allAreasMeals[i].idMeal}">
             <img src="${ allAreasMeals[i].strMealThumb}" alt="" class="meal-img w-100 rounded-2"/>
              <div class="layer">
               <h3 class="text-center mt-5 pt-5">${ allAreasMeals[i].strMeal}</h3>
              </div>
       </div>
    </div>
       `
  }
  row.innerHTML=cartona;
   inputContainer.innerHTML =""

const Cards = document.querySelectorAll(".category-card");

  for (let i = 0; i < Cards.length; i++) {
     Cards[i].addEventListener("click", function () {
    
    const selectedArea = this.getAttribute("data-category");
    console.log(selectedArea)
    areaDetails(selectedArea); 
  });
}
   
}

async function areaDetails(word){
   try{
  const req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${word}`);
  const response = await req.json();
    allAreaDetail = response.meals;
   displayAreaDetail()
  console.log(allCategoryDetail);
  }catch(error){
         console.error(error)
  }

  
  
 }

 function displayAreaDetail(){
  var cartona=``
  for(var i=0 ; i<allAreaDetail.length; i++){

 
    var ingredientsList = ``;
    
    
    for (var j = 1; j <= 20; j++) {
      var ingredient = allAreaDetail[i][`strIngredient${j}`];
       var measure = allAreaDetail[i][`strMeasure${j}`];
            if(ingredient !==""||measure!==0){

         ingredientsList +=`
          <div class="badge bg-info m-1 p-2">${measure} ${ingredient}</div>`
            }
    }



    cartona+=`
    <div class="d-flex">
    <div class="col-md-5">
       <img src="${allAreaDetail[i].strMealThumb}" alt="" class="meal-img w-75 rounded-2">
       <br>
       <span class="text-white fs-2">${allAreaDetail[i].strMeal}</span>
     </div>  
     <div class="col-md-7 text-white gx-0">   
     <span class="fs-1">instructions</span>
       <p class="gx-0">${allAreaDetail[i].strInstructions}</p>
       <span class="fs-2 mb-1">Area: ${allAreaDetail[i].strArea}</span "> <br>
      <span class="fs-2 mb-1">Category: ${allAreaDetail[i].strCategory}</span "> <br>
       <span class="fs-2 mb-1">Tags:</span>
       <div>${ ingredientsList}</div>
       <div class="mb-5">
       <button class="btn btn-success" onclick="window.open('${allAreaDetail[i].strSource}','_blank')">Source</button>
       <button class="btn btn-danger" onclick="window.open('${allAreaDetail[i].strYoutube}','_blank')">Youtube</button>
       </div>

    </div>  
    </div> 
    `
  }
  row.innerHTML=cartona
 }

//&&ingredients ///////////////////////////////////////////////////////////////////////////////
async function allIngredientsData(){
const req = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
  const response = await req.json();
   allIngredients = response.meals;
  displayAllIngredients()
}

function displayAllIngredients(){
    var cartona=``
  for(var i=0 ; i<allIngredients.length ; i++){
    cartona+=`
    <div class="col-md-3 pb-4">
      <div class="area-card text-white d-flex flex-column text-center" data-Ingredien="${allIngredients[i].strIngredient}">
           <i class="fa-solid fa-drumstick-bite fs-1"></i>
           <h3 class="text-center">${allIngredients[i].strIngredient}</h3>
             <p> ${allIngredients[i].strDescription?.split(' ').slice(0, 10).join(' ')}</p>
       </div>
    </div>
       `
  }
  row.innerHTML=cartona;
 inputContainer.innerHTML =""

  const IngredienCards = document.querySelectorAll(".area-card");

  for (let i = 0; i < IngredienCards.length; i++) {
     IngredienCards[i].addEventListener("click", function () {
    
    const selecteIngredien = this.getAttribute("data-Ingredien");
    console.log(selecteIngredien)
    allIngredientMeals(selecteIngredien); 
  });
}
}




async function allIngredientMeals(word){
  try{
  const req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${word}`);
  const response = await req.json();
   allIngredientsMeals = response.meals;
  displayAllIngredientMeals()
  console.log(allIngredientsMeals);
  }catch(error){
     console.error(error)
  }
  
}

function displayAllIngredientMeals(){
    var cartona=``
  for(var i=0 ; i<  allIngredientsMeals.length ; i++){
    cartona+=`
    <div class="col-md-3 pb-4">
      <div class="category-card" data-category="${ allIngredientsMeals[i].idMeal}">
             <img src="${ allIngredientsMeals[i].strMealThumb}" alt="" class="meal-img w-100 rounded-2"/>
              <div class="layer">
               <h3 class="text-center mt-5 pt-5">${allIngredientsMeals[i].strMeal}</h3>
              </div>
       </div>
    </div>
       `
  }
  row.innerHTML=cartona;
  inputContainer.innerHTML=""


  const Cards = document.querySelectorAll(".category-card");

  for (let i = 0; i < Cards.length; i++) {
     Cards[i].addEventListener("click", function () {
    
    const selecteIngredien = this.getAttribute("data-category");
    console.log(selecteIngredien)
    IngredientDetails(selecteIngredien); 
  });
}
}




 async function IngredientDetails(word){
   try{
  const req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${word}`);
  const response = await req.json();
    allIngredientDetail = response.meals;
   displayIngredientDetail()
  console.log(allIngredientDetail);
  }catch(error){
         console.error(error)
  }

  
  
 }

 function displayIngredientDetail(){
  var cartona=``
  for(var i=0 ; i<allIngredientDetail.length; i++){

 

var ingredientsList = ``;
    
    
    for (var j = 1; j <= 20; j++) {
      var ingredient = allIngredientDetail[i][`strIngredient${j}`];
       var measure = allIngredientDetail[i][`strMeasure${j}`];
            if(ingredient !==""||measure!==""){

         ingredientsList +=`
          <div class="badge bg-info m-1 p-2">${measure} ${ingredient}</div>`
            }
    }

    cartona+=`
    <div class="d-flex">
    <div class="col-md-5">
       <img src="${allIngredientDetail[i].strMealThumb}" alt="" class="meal-img w-75 rounded-2">
       <br>
       <span class="text-white fs-2">${allIngredientDetail[i].strMeal}</span>
     </div>  
     <div class="col-md-7 text-white gx-0">   
     <span class="fs-1">instructions</span>
       <p class="gx-0">${allIngredientDetail[i].strInstructions}</p>
       <span class="fs-2 mb-1">Area: ${allIngredientDetail[i].strArea}</span "> <br>
      <span class="fs-2 mb-1">Category: ${allIngredientDetail[i].strCategory}</span "> <br>
      <span class="fs-4 mb-1">Recipes: </span "><br>
      <div>${ingredientsList}</div>
       <span class="fs-2 mb-1">Tags:</span>
       <div class="mb-5">
       <button class="btn btn-success" onclick="window.open('${allIngredientDetail[i].strSource}','_blank')">Source</button>
       <button class="btn btn-danger" onclick="window.open('${allIngredientDetail[i].strYoutube}','_blank')">Youtube</button>
       </div>

    </div>  
    </div> 
    `
  }
  row.innerHTML=cartona
 }
// && contact us/////////////////////////////////////////////////////////////////////////////
function validationData() {
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const phoneRegex = /^\d{10}$/;
  const ageRegex = /^(1[01][0-9]|120|[1-9][0-9]?)$/;


  const name = inputName.value.trim();
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();
  const repassword = inputRepassword.value.trim();
  const phone = inputPhone.value.trim();
  const age = inputAge.value.trim();


  if(nameRegex.test(name)){
    nameError.classList.add("d-none"); 
}else{
  nameError.classList.remove("d-none")
}

if (emailRegex.test(email)) {
    emailError.classList.add("d-none"); 
} else {
  emailError.classList.remove("d-none"); 
}
 if (passwordRegex.test(password)) {
  passwordError.classList.add("d-none");
} else {
  passwordError.classList.remove("d-none");
}
if (phoneRegex.test(phone)) {
  phoneError.classList.add("d-none");
} else {
  phoneError.classList.remove("d-none");
}
if (repassword==password) {
  repasswordError.classList.add("d-none");
} else {
  repasswordError.classList.remove("d-none");
}
if (ageRegex.test(age)) {
  ageError.classList.add("d-none");
} else {
  ageError.classList.remove("d-none");
}
     


  if (
    name &&
    emailRegex.test(email) &&
    passwordRegex.test(password) &&
    password === repassword &&
    phoneRegex.test(phone) &&
    age
  ) {
    submitBtn.classList.remove("disabled")
  } else {
    submitBtn.classList.add("disabled")

  }



}
 function forminputs() {
  let cartona = `
    <form>
      <div class="container">
        <div class="d-flex box-login">
          <div class="col-md-5">
            <div class="mt-2 mb-3 mx-4">
              <input type="text" class="form-control" id="name" placeholder="Enter your Name">
              <div id="nameError" class="text-danger small mt-1 d-none">Special characters and numbers not allowed</div>
            </div>
            <div class="mt-2 mb-3 mx-4">
              <input type="text" class="form-control" id="phone" placeholder="Enter your Phone">
              <div id="phoneError" class="text-danger small mt-1 d-none">Enter valid phone number</div>
            </div>
            <div class="mt-2 mb-3 mx-4">
              <input type="text" class="form-control" id="password" placeholder="Enter your Password">
              <div id="passwordError" class="text-danger small mt-1 d-none">Enter valid password *Minimum eight characters, at least one letter and one number*</div>
            </div>
          </div>
          <div class="col-md-5">
            <div class="mt-2 mb-3 mx-4">
              <input type="text" class="form-control" id="email" placeholder="Enter your Email">
              <div id="emailError" class="text-danger small mt-1 d-none">Email not valid *example@yyy.zzz*</div>
            </div>
            <div class="mt-2 mb-3 mx-4">
              <input type="text" class="form-control" id="age" placeholder="Enter your Age">
              <div id="ageError" class="text-danger small mt-1 d-none">Enter valid age</div>
            </div>
            <div class="mt-2 mb-3 mx-4">
              <input type="text" class="form-control" id="repassword" placeholder="Repassword">
              <div id="repasswordError" class="text-danger small mt-1 d-none">Passwords do not match</div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <button id="submitBtn" class="btn btn-outline-danger px-5 disabled">Sign Up</button>
        </div>
      </div>
    </form>
  `;

  row.innerHTML = cartona;

  inputName = document.getElementById("name");
  inputEmail = document.getElementById("email");
  inputPhone = document.getElementById("phone");
  inputPassword = document.getElementById("password");
  inputRepassword = document.getElementById("repassword");
  inputAge = document.getElementById("age");
  submitBtn = document.getElementById("submitBtn");

  nameError = document.getElementById("nameError");
  emailError = document.getElementById("emailError");
  phoneError = document.getElementById("phoneError");
  passwordError = document.getElementById("passwordError");
  repasswordError = document.getElementById("repasswordError");
  ageError = document.getElementById("ageError");

  [inputName, inputEmail, inputPhone, inputPassword, inputRepassword, inputAge].forEach((input) => {
    input.addEventListener("input", validationData);
  });

}

  for(var i=0 ; i< navLinks.length ; i++){
  navLinks[i].addEventListener("click",function(e){
    console.log(e.target.innerHTML)

   if(e.target.innerHTML=="Categories"){
     barsIcon.classList.remove("d-none")
     closeIcon.classList.add("d-none")
    allCategoriesData();
   
   }else if(e.target.innerHTML=="Contact Us"){
     barsIcon.classList.remove("d-none")
     closeIcon.classList.add("d-none")
     forminputs();

   }else if(e.target.innerHTML=="Area"){
     barsIcon.classList.remove("d-none")
     closeIcon.classList.add("d-none")
      allAreasData();

   } else if(e.target.innerHTML=="Ingredients"){
     barsIcon.classList.remove("d-none")
     closeIcon.classList.add("d-none")
     allIngredientsData();

   }else if(e.target.innerHTML=="Search"){
     barsIcon.classList.remove("d-none")
     closeIcon.classList.add("d-none")
    searchInput();
   }
  })
}



