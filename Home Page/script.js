// DOM elements of navbar
const menu = document.querySelector(".menu-icon i");
const page = document.getElementsByClassName("full-page")[0];
const dropBtn = document.getElementById("dropButton");
const countryList = document.getElementById("country-list");
const navListItems = document.querySelectorAll(".nav-list li");
const searchIcon = document.getElementById("searchBtn");
const footerInput = document.querySelector(".footer input");
const countryDropBtn = document.querySelector(".country-search i");

// Event listener for menu button
menu.addEventListener("click",()=>{
  footerInput.scrollIntoView({ behavior: 'smooth' });
});
// DOM elements of hero section
const headNewsWithImage = document.getElementsByClassName("news-with-img");
const headNewsDesc = document.getElementById("headNewsDesc");
const topAnchor = document.getElementsByClassName("topAnchor");
const topImages = document.getElementsByClassName("img");
const otherHeadlines = document.getElementsByClassName("top-news-wthout-image");

let countryCode = null; // Declare countryCode variable with default value as null

// Event listner for country list drop button
var temp1=0;
countryDropBtn.addEventListener("click",()=>{
  if(temp=0) {
    countryList.style.display="block";
    temp1=1;
  }
  else {
    countryList.style.display="none";
    temp1=0;
  }
})

// Function to filter countries based on search input
const countrySearchInput = document.querySelector(".country-search input");
function filterCountries() {
  const filter = countrySearchInput.value.trim().toUpperCase();
  const countries = countryList.getElementsByTagName("li");

  for (let i = 1; i < countries.length; i++) {
    const countryName = countries[i].textContent.trim().toUpperCase();
    if (countryName.includes(filter)) {
      countries[i].style.display = "";
    } else {
      countries[i].style.display = "none";
    }
  }
}

// Add event listener for search input to filter countries dynamically
countrySearchInput.addEventListener("input", filterCountries);

// Initial population of the country list
filterCountries();


// Code to select country to show news of that region
var countryNameOnPage = document.getElementById("add-second");
var countries = document.querySelectorAll("#country-list li p");
var currentCountryCode = document.querySelectorAll("#country-list li span");

for (let i = 0; i < countries.length; i++) {
  countries[i].addEventListener("click", () => {
    countryNameOnPage.innerText = countries[i].innerText;
    countryCode = currentCountryCode[i].innerText;
    countryList.style.display="none";
    showTopNews(); // Call the showNews function after the user selects a country
    showBusinessNews();
    showSportsNews();
    showentertainmentNews();
    showhealthNews();
    showscienceNews();
    showtechNews();
  });
}
// Function to send user to search box by clicking on search icon
function goDown() {
  if (window.innerWidth <= 480) {
    footerInput.scrollIntoView({ behavior: 'smooth' });
  }
}
searchIcon.addEventListener("click", goDown);


// Function to display top news headlines based on selected country
async function showTopNews() {
  try {
    if (!countryCode) {
      // Add a default country code if none is selected
      countryCode = "in";
    }

    const apiKey = "d187c2ada39a45bdb725656d521ef92b";
    const apiUrl = "https://newsapi.org/v2/top-headlines?country=" + countryCode + "&apiKey=" + apiKey + "&pageSize=100";

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Some error occurred!");
    }
    const data = await response.json();
    if (data.articles && data.articles.length > 0) {
      
        let randIndices = [];
        while (randIndices.length < data.articles.length) {
          const randIndex = Math.floor(Math.random() * data.articles.length);
          if (!randIndices.includes(randIndex)) {
            randIndices.push(randIndex);
          }
        }
        for(var i=0;i<4;i++) {
          headNewsDesc.innerText = data.articles[randIndices[0]].description;
          headNewsWithImage[i].innerText = data.articles[randIndices[i]].title;
          topAnchor[i].href = data.articles[randIndices[i]].url;
          if(data.articles[randIndices[i]].urlToImage === null) {
            topImages[i].src = "images/image.png";
          }
          else{
            topImages[i].src = data.articles[randIndices[i]].urlToImage;
          }
        
        }
        for(var j=0;j<18;j++) {
          otherHeadlines[j].innerText = data.articles[randIndices[j+4]].title;
          otherHeadlines[j].href = data.articles[randIndices[j+4]].url;
        }
        console.log(data);
    } else {
      // If no articles, display a message
      topNews1.innerText = "No news articles found.";
    }
    
  } catch (error) {
    console.log("Error:" + error.message);
  }
}

// Variable to toggle country list visibility
var temp = 0;

// Add event listener to dropBtn to toggle country list visibility
dropBtn.addEventListener("click", () => {
  if (temp === 0) {
    countryList.style.display = "block";
    temp = 1;
  } else {
    countryList.style.display = "none";
    temp = 0;
  }
});


/* FEATURED SECTIONS */

// BUSINESS SECTION


const businessHead = document.getElementById("business-heading");
const businessHeadAnchor = document.getElementById("business-anchor");
const businessHeadImg = document.getElementById("business-img");
const businessNews = document.querySelectorAll("#business ul li");
const businessNewsAnchor = document.querySelectorAll("#business ul a");

async function showBusinessNews() {
try {
if (!countryCode) {
  // Add a default country code if none is selected
  countryCode = "in"; // For example, set the default as "in" (India)
}

const apiKey = "d187c2ada39a45bdb725656d521ef92b"; 
const apiUrl = "https://newsapi.org/v2/top-headlines?country=" + countryCode + "&apiKey=" + apiKey + "&pageSize=100&category=business";

const response = await fetch(apiUrl);
if (!response.ok) {
  throw new Error("Some error occurred!");
}
const data = await response.json();
if (data.articles && data.articles.length > 0) {
  
    // Generate random indices for up to 3 articles with images
    let randIndices = [];
    while (randIndices.length < 5) {
      const randIndex = Math.floor(Math.random() * data.articles.length);
      if (!randIndices.includes(randIndex)) {
        randIndices.push(randIndex);
      }
    }
    businessHead.innerText = data.articles[randIndices[0]].title;
    businessHeadAnchor.href = data.articles[randIndices[0]].url;
    if(data.articles[randIndices[0]].urlToImage!=null) {
      businessHeadImg.src = data.articles[randIndices[0]].urlToImage;
     }
     else {
      businessHeadImg.src = "images/image.png";
     }        for(let i=0;i<businessNews.length;i++) {
      businessNews[i].innerText = data.articles[randIndices[i+1]].title;
      businessNewsAnchor[i].href = data.articles[randIndices[i+1]].url;
    }
    console.log(data);
} else {
  // If no articles, display a message  
  alert("NO ARTICLES FOUND");
}

} catch (error) {
console.log("Error:" + error.message);
}
}


// ENTERTAINMENT SECTION


const entertainmentHead = document.getElementById("entertainment-heading");
const entertainmentHeadAnchor = document.getElementById("entertainment-anchor");
const entertainmentHeadImg = document.getElementById("entertainment-img");
const entertainmentNews = document.querySelectorAll("#entertainment ul li");
const entertainmentNewsAnchor = document.querySelectorAll("#entertainment ul a");

async function showentertainmentNews() {
try {
if (!countryCode) {
// Add a default country code if none is selected
countryCode = "in"; // For example, set the default as "in" (India)
}

const apiKey = "d187c2ada39a45bdb725656d521ef92b"; 
const apiUrl = "https://newsapi.org/v2/top-headlines?country=" + countryCode + "&apiKey=" + apiKey + "&pageSize=100&category=entertainment";

const response = await fetch(apiUrl);
if (!response.ok) {
throw new Error("Some error occurred!");
}
const data = await response.json();
if (data.articles && data.articles.length > 0) {

 // Generate random indices for up to 3 articles with images
 let randIndices = [];
 while (randIndices.length < 5) {
   const randIndex = Math.floor(Math.random() * data.articles.length);
   if (!randIndices.includes(randIndex)) {
     randIndices.push(randIndex);
   }
 }
 entertainmentHead.innerText = data.articles[randIndices[0]].title;
 entertainmentHeadAnchor.href = data.articles[randIndices[0]].url;
 if(data.articles[randIndices[0]].urlToImage!=null) {
  entertainmentHeadImg.src = data.articles[randIndices[0]].urlToImage;
 }
 else {
  entertainmentHeadImg.src = "images/image.png";
 }     for(let i=0;i<entertainmentNews.length;i++) {
   entertainmentNews[i].innerText = data.articles[randIndices[i+1]].title;
   entertainmentNewsAnchor[i].href = data.articles[randIndices[i+1]].url;
 }
 console.log(data);
} else {
// If no articles, display a message  
alert("NO ARTICLES FOUND");
}

} catch (error) {
console.log("Error:" + error.message);
}
}

// SPORTS SECTION


const sportsHead = document.getElementById("sports-heading");
const sportsHeadAnchor = document.getElementById("sports-anchor");
const sportsHeadImg = document.getElementById("sports-img");
const sportsNews = document.querySelectorAll("#sports ul li");
const sportsNewsAnchor = document.querySelectorAll("#sports ul a");

async function showSportsNews() {
try {
if (!countryCode) {
// Add a default country code if none is selected
countryCode = "in"; // For example, set the default as "in" (India)
}

const apiKey = "d187c2ada39a45bdb725656d521ef92b"; 
const apiUrl = "https://newsapi.org/v2/top-headlines?country=" + countryCode + "&apiKey=" + apiKey + "&pageSize=100&category=sports";

const response = await fetch(apiUrl);
if (!response.ok) {
throw new Error("Some error occurred!");
}
const data = await response.json();
if (data.articles && data.articles.length > 0) {

 // Generate random indices for up to 3 articles with images
 let randIndices = [];
 while (randIndices.length < 5) {
   const randIndex = Math.floor(Math.random() * data.articles.length);
   if (!randIndices.includes(randIndex)) {
     randIndices.push(randIndex);
   }
 }
 sportsHead.innerText = data.articles[randIndices[0]].title;
 sportsHeadAnchor.href = data.articles[randIndices[0]].url;
 if(data.articles[randIndices[0]].urlToImage!=null) {
  sportsHeadImg.src = data.articles[randIndices[0]].urlToImage;
 }
 else {
  sportsHeadImg.src = "images/image.png";
 }     for(let i=0;i<sportsNews.length;i++) {
   sportsNews[i].innerText = data.articles[randIndices[i+1]].title;
   sportsNewsAnchor[i].href = data.articles[randIndices[i+1]].url;
 }
 console.log(data);
} else {
// If no articles, display a message  
alert("NO ARTICLES FOUND");
}

} catch (error) {
console.log("Error:" + error.message);
}
}


// HEALTH SECTION


const healthHead = document.getElementById("health-heading");
const healthHeadAnchor = document.getElementById("health-anchor");
const healthHeadImg = document.getElementById("health-img");
const healthNews = document.querySelectorAll("#health ul li");
const healthNewsAnchor = document.querySelectorAll("#health ul a");

async function showhealthNews() {
try {
if (!countryCode) {
// Add a default country code if none is selected
countryCode = "in"; // For example, set the default as "in" (India)
}

const apiKey = "d187c2ada39a45bdb725656d521ef92b"; 
const apiUrl = "https://newsapi.org/v2/top-headlines?country=" + countryCode + "&apiKey=" + apiKey + "&pageSize=100&category=health";

const response = await fetch(apiUrl);
if (!response.ok) {
throw new Error("Some error occurred!");
}
const data = await response.json();
if (data.articles && data.articles.length > 0) {

 // Generate random indices for up to 3 articles with images
 let randIndices = [];
 while (randIndices.length < 5) {
   const randIndex = Math.floor(Math.random() * data.articles.length);
   if (!randIndices.includes(randIndex)) {
     randIndices.push(randIndex);
   }
 }
 healthHead.innerText = data.articles[randIndices[0]].title;
 healthHeadAnchor.href = data.articles[randIndices[0]].url;
 if(data.articles[randIndices[0]].urlToImage!=null) {
  healthHeadImg.src = data.articles[randIndices[0]].urlToImage;
 }
 else {
  healthHeadImg.src = "images/image.png";
 }     for(let i=0;i<healthNews.length;i++) {
   healthNews[i].innerText = data.articles[randIndices[i+1]].title;
   healthNewsAnchor[i].href = data.articles[randIndices[i+1]].url;
 }
 console.log(data);
} else {
// If no articles, display alert message 
alert("NO ARTICLES FOUND");
}

} catch (error) {
console.log("Error:" + error.message);
}
}


// SCIENCE SECTION


const scienceHead = document.getElementById("science-heading");
const scienceHeadAnchor = document.getElementById("science-anchor");
const scienceHeadImg = document.getElementById("science-img");
const scienceNews = document.querySelectorAll("#science ul li");
const scienceNewsAnchor = document.querySelectorAll("#science ul a");

async function showscienceNews() {
try {
if (!countryCode) {
// Add a default country code if none is selected
countryCode = "in"; // For example, set the default as "in" (India)
}

const apiKey = "d187c2ada39a45bdb725656d521ef92b"; 
const apiUrl = "https://newsapi.org/v2/top-headlines?country=" + countryCode + "&apiKey=" + apiKey + "&pageSize=100&category=science";

const response = await fetch(apiUrl);
if (!response.ok) {
throw new Error("Some error occurred!");
}
const data = await response.json();
if (data.articles && data.articles.length > 0) {

 // Generate random indices for up to 3 articles with images
 let randIndices = [];
 while (randIndices.length < 5) {
   const randIndex = Math.floor(Math.random() * data.articles.length);
   if (!randIndices.includes(randIndex)) {
     randIndices.push(randIndex);
   }
 }
 scienceHead.innerText = data.articles[randIndices[0]].title;
 scienceHeadAnchor.href = data.articles[randIndices[0]].url;
 if(data.articles[randIndices[0]].urlToImage!=null) {
  scienceHeadImg.src = data.articles[randIndices[0]].urlToImage;
 }
 else {
  scienceHeadImg.src = "images/image.png";
 }     for(let i=0;i<scienceNews.length;i++) {
   scienceNews[i].innerText = data.articles[randIndices[i+1]].title;
   scienceNewsAnchor[i].href = data.articles[randIndices[i+1]].url;
 }
 console.log(data);
} else {
// If no articles, display a message  
alert("NO ARTICLES FOUND");
}

} catch (error) {
console.log("Error:" + error.message);
}
}


// TECH SECTION


const techHead = document.getElementById("tech-heading");
const techHeadAnchor = document.getElementById("tech-anchor");
const techHeadImg = document.getElementById("tech-img");
const techNews = document.querySelectorAll("#tech ul li");
const techNewsAnchor = document.querySelectorAll("#tech ul a");

async function showtechNews() {
try {
if (!countryCode) {
// Add a default country code if none is selected
countryCode = "in"; // For example, set the default as "in" (India)
}

const apiKey = "d187c2ada39a45bdb725656d521ef92b"; 
const apiUrl = "https://newsapi.org/v2/top-headlines?country=" + countryCode + "&apiKey=" + apiKey + "&pageSize=100&category=technology";

const response = await fetch(apiUrl);
if (!response.ok) {
throw new Error("Some error occurred!");
}
const data = await response.json();
if (data.articles && data.articles.length > 0) {

 // Generate random indices for up to 3 articles with images
 let randIndices = [];
 while (randIndices.length < 5) {
   const randIndex = Math.floor(Math.random() * data.articles.length);
   if (!randIndices.includes(randIndex)) {
     randIndices.push(randIndex);
   }
 }
 techHead.innerText = data.articles[randIndices[0]].title;
 techHeadAnchor.href = data.articles[randIndices[0]].url;
 if(data.articles[randIndices[0]].urlToImage!=null) {
  techHeadImg.src = data.articles[randIndices[0]].urlToImage;
 }
 else {
  techHeadImg.src = "images/image.png";
 }
 for(let i=0;i<techNews.length;i++) {
   techNews[i].innerText = data.articles[randIndices[i+1]].title;
   techNewsAnchor[i].href = data.articles[randIndices[i+1]].url;
 }
 console.log(data);
} else {
// If no articles, display a message  
alert("NO ARTICLES FOUND");
}

} catch (error) {
console.log("Error:" + error.message);
}
}

window.onload = () => {
showTopNews();
showBusinessNews();
showSportsNews();
showentertainmentNews();
showhealthNews();
showscienceNews();
showtechNews();
};

/* SEARCH RESULTS */
const searchInput = document.querySelector(".search-box input");
const resultsNumber = document.querySelectorAll(".top-text span")[0];
const searchText = document.querySelectorAll(".top-text span")[1];


// Function to handle the search icon click event
searchIcon.addEventListener('click', () => {
const searchInputValue = searchInput.value.trim();
sessionStorage.setItem('searchQuery', searchInputValue);
// Redirect the user to the absolute URL with the search input value as a query parameter
const newPageUrl = '../Search%20Results/results.html?q=' + encodeURIComponent(searchInputValue);
window.location.href = newPageUrl;
});

document.addEventListener('keypress', (e) => {
if (e.key === "Enter" && searchInput.value !== "") {
const searchInputValue = searchInput.value.trim();
sessionStorage.setItem('searchQuery', searchInputValue);
// Redirect the user to the absolute URL with the search input value as a query parameter
const newPageUrl = '../Search%20Results/results.html?q=' + encodeURIComponent(searchInputValue);
window.location.href = newPageUrl;
}
});