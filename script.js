// get quotes from api

const quoteContainer    = document.getElementById("quote-container");
const quote             = document.getElementById("quote");
const author            = document.getElementById("author");
const button            = document.getElementById("new-quote");
const twitter           = document.getElementById("twitter");
const loader            = document.getElementById("loader");

let apiQuotes = [];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function loaded() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    const quoteText = globalThis.quote;

    if(!quote.author) {
        author.textContent = "Unknown";
    } else {
        author.textContent = quote.author;
    }

    if (quote.text.length>100) {
        quoteText.classList.add('long-text');
    } else {
        quoteText.classList.remove('long-text');
    }
    quoteText.textContent = quote.text;
    loaded();
}

async function getQuotes() {
    loading();
    const url = "https://type.fit/api/quotes";
    try {
        const response = await fetch(url);
        apiQuotes = await response.json();
        newQuote();
        //console.log(apiQuotes);

    } catch (error) {
        
    }
}


function tweetQuote() {
    const url = `https://twitter.com/intent/tweet?text=${globalThis.quote.textContent} - ${author.textContent}`;
    window.open(url, '_blank');
}

button.addEventListener('click', newQuote);
twitter.addEventListener('click', tweetQuote);

getQuotes();

