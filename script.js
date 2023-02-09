const quoteContainer = document.querySelector("#quote-container");
const twitterBtn = document.querySelector("#twitter-btn");
const newQuoteBtn = document.querySelector("#new-quote-btn");
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector("#author");
const loader = document.querySelector("#loader");

let fetchedQuotes = [];

//fetch quotes from API
async function fetchQuotesFromAPI() {
  showLoader();
  try {
    const response = await fetch("https://type.fit/api/quotes");
    fetchedQuotes = await response.json();
    showRandomQuote();
  } catch (error) {
    alert("Sorry, something went wrong :(");
  }
}

const showRandomQuote = () => {
  //   showLoader();
  const randomNr = Math.floor(Math.random() * fetchedQuotes.length);
  const randomQuote = fetchedQuotes[randomNr];

  //adjust font style to the length of quote
  if (randomQuote.text.length > 100) quoteText.classList.add("long-quote");
  else quoteText.classList.remove("long-quote");

  //display this quote
  quoteText.textContent = randomQuote.text;
  quoteAuthor.textContent = randomQuote.author || "Unknown";

  hideLoaderShowQuote();
};

const openTwitterToTweetQuote = () => {
  //access quote text and author from what we set to display
  const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" - ${quoteAuthor.textContent}`;

  //open twitter in new window with prepared tweet
  window.open(twitterUrl, "_blank");
};

const showLoader = () => {
  quoteContainer.hidden = true;
  loader.hidden = false;
};

const hideLoaderShowQuote = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

//on load
fetchQuotesFromAPI();

//event listeners
twitterBtn.addEventListener("click", openTwitterToTweetQuote);
newQuoteBtn.addEventListener("click", showRandomQuote);
