const APIkey = "your API key"
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener("load", () => fetchnews("India"));

function reload(){
    window.location.reload();
}

async function fetchnews(query){
    const response = await fetch(`${url}${query}&apikey=${APIkey}`);
    const data   = await response.json();
    console.log(data);
    bindData(data.articles);  // fetching the news and adding the data into the template
}

function bindData(articles){  // adding the data into the template
    const cardscontainer = document.getElementById("cards-container")
    const newscardtemplate = document.getElementById("template-news-card")

    cardscontainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;  // if image is not there then return from the loop
        const cardClone = newscardtemplate.content.cloneNode(true);  // cloning the node elements as well to make another news template
        fillDataInCard(cardClone, article);
        cardscontainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {  // adding the fetched data into the cards
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc= cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
    newsSource.innerHTML = `${article.source.name} &#183; ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank")  // opens the news in new tab when clicked
    })
}

let curSelectedNav = null;   // current topic selection from navbar
function onNavItemClick(id) {
    fetchnews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active'); // if not null then remove active
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchbutton = document.getElementById('search-button')
const searchText = document.getElementById('search-text')

searchbutton.addEventListener('click', () => {  // displaying the news from the search input
    const query = searchText.value;
    if(!query) return;
    fetchnews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})
