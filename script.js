const quoteContainer = document.getElementById ('quote-container');
const quoteText = document.getElementById ('quote');
const authorText = document.getElementById ('author');
const twitterBtn = document.getElementById ('twitter');
const newQuoteBtn = document.getElementById ('new-quote');
const loader = document.getElementById ('loader');

//Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//check loading

function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Quote from API

async function getQuote() {
    loading();
    const proxyURL = 'https://cors-anywhere.herokuapp.com/'
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
        const response = await fetch(proxyURL + apiURL);
        const data  = await response.json();
        //console.log(data);

        // If Author Name is not given
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown'
        } else{
            authorText.innerText = data.quoteAuthor;
        }

        //Reducing fontsize for long-quotes
        if(data.quoteText.length > 50){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;

        //Loader stops
        complete();

    }catch(error) {
        getQuote();
        //console.log('Oops! No Quote', error);
        
    }
}
//Tweet Quote

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote(); 

