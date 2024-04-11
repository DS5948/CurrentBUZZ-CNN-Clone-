    // DOM elements of navbar
    const menu = document.querySelector(".menu-icon i");
    const page = document.getElementsByClassName("full-page")[0];
    const navListItems = document.querySelectorAll(".nav-list li");
    const searchIcon = document.getElementById("searchBtn");
    const footerInput = document.querySelector(".footer input");

    // Event listener for menu button
    menu.addEventListener("click",()=>{
      footerInput.scrollIntoView({ behavior: 'smooth' });
    });
   
    // Function to send user to search box by clicking on search icon
    function goDown() {
      if (window.innerWidth <= 480) {
        footerInput.scrollIntoView({ behavior: 'smooth' });
      }
    }
    searchIcon.addEventListener("click", goDown);


/* SEARCH RESULTS */
const searchInput = document.querySelector(".search-box input");
const resultsNumber = document.querySelectorAll(".top-text span")[0];
const searchText = document.querySelectorAll(".top-text span")[1];

  // Function to get the value of a specific parameter from the URL
  function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  const searchQuery = getParameterByName('q');
// Call the function to fetch and display the search results

showSeacrhResults(encodeURIComponent(searchQuery));

const resultsNavInput = document.querySelector(".result-nav .search-box input");
resultsNavInput.value = searchQuery;
const topText = document.querySelector(".top-text")
const showMore = document.querySelector(".show-more");
async function showSeacrhResults(searchQuery) {
  try {
  const apiKey = "d187c2ada39a45bdb725656d521ef92b";
  const apiUrl = "https://newsapi.org/v2/everything?q=" + searchQuery + "&apiKey=" + apiKey;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Some error occurred!");
  }
  const data = await response.json();
  const totalResults = data.articles.length;

  if(totalResults>0) {
    resultsNumber.innerText = data.articles.length;
    searchText.innerText = searchQuery;
    topText.style.display="block";
    showMore.style.display="block";
    for (var i = 0; i < totalResults; i++) {
      // Create the news div
      const newsDiv = document.createElement("div");
      newsDiv.classList.add("news");
    
      // Create the news image div and its child image element
      const newsImgDiv = document.createElement("div");
      newsImgDiv.classList.add("news-img");
      const newsImg = document.createElement("img");
      if (data.articles[i].urlToImage !== null) {
        newsImg.src = data.articles[i].urlToImage;
      } else {
        newsImg.src = "../Home Page/images/image.png";
      }
      newsImgDiv.appendChild(newsImg);
    
      // Create the news text div and its child elements
      const newsTextDiv = document.createElement("div");
      newsTextDiv.classList.add("news-text");
    
      // Create an anchor tag for the headline
      const headlineAnchor = document.createElement("a");
      headlineAnchor.classList.add("headline-link");
      headlineAnchor.href = data.articles[i].url; // Set the URL from the API data
    
      const headline = document.createElement("h2");
      headline.textContent = data.articles[i].title;
      headlineAnchor.appendChild(headline); // Append the headline to the anchor element
    
      const date = document.createElement("p");
      date.textContent = data.articles[i].publishedAt.slice(0, 10);
      const description = document.createElement("p");
      description.classList.add("desc");
      description.textContent = data.articles[i].description;
    
      // Append child elements to the news text div
      newsTextDiv.appendChild(headlineAnchor); // Append the anchor tag instead of the headline directly
      newsTextDiv.appendChild(date);
      newsTextDiv.appendChild(description);
    
      // Append newsImgDiv and newsTextDiv as children of newsDiv
      newsDiv.appendChild(newsImgDiv);
      newsDiv.appendChild(newsTextDiv);
    
      // Get the results div where we want to append the news
      const resultsDiv = document.querySelector(".news-results");
      // Append the news div to the results div
      resultsDiv.appendChild(newsDiv);
    }

  console.log(data);
}
else {
  console.log("No Articles found");
}
}
catch (error) {
  console.log("Error:" + error.message);
}
}
// Function to handle the search icon click event
searchIcon.addEventListener('click', () => {
  const searchInputValue = searchInput.value.trim();
  sessionStorage.setItem('searchQuery', searchInputValue);
  // Redirect the user to the absolute URL with the search input value as a query parameter
  const newPageUrl = 'results.html?q=' + encodeURIComponent(searchInputValue);
  window.location.href = newPageUrl;
});

document.addEventListener('keypress', (e) => {
  if (e.key === "Enter" && searchInput.value !== "") {
    const searchInputValue = searchInput.value.trim();
    sessionStorage.setItem('searchQuery', searchInputValue);
    // Redirect the user to the absolute URL with the search input value as a query parameter
    const newPageUrl = 'results.html?q=' + encodeURIComponent(searchInputValue);
    window.location.href = newPageUrl;
  }
});
window.addEventListener('pageshow', function (event) {
  // Check if the search query parameter (q) has changed
  const currentPageQuery = searchInput.value;
  if (currentPageQuery !== searchQuery) {
    // If the query has changed, reload the page to update the search results
    window.location.reload();
  }
});