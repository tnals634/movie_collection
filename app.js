const $mycards = document.querySelector(".mycards");
const $movieCard = document.querySelector(".movieCard");

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTZkNjQ1M2NhYmUzMjQyMzNiZTE4NWQ2NDMyNjI2NyIsInN1YiI6IjY0NzNmN2M3ZGQ3MzFiMmQ3OWQxYzNlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NcuTmHM5yydzVpzst6vf98EHpLKloutH7zNYhSJbyJc'
    }
};

let url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

let fetchJson = async function (url) {
    try {
        let response = await fetch(url, options);
        let data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
}

function test() {
    fetchJson(url).then((data) => {
        let rows = data.results;
        rows.forEach((a) => {
            let id = a['id'];
            let title = a['title'];
            let image = `https://www.themoviedb.org/t/p/w500/${a['poster_path']}`;
            let overView = a['overview'];
            let rating = a['vote_average'];

            newCard(id, title, image, overView, rating, $mycards).then((div) => {
                console.log(div);
            });
        })
    });
}
test();

function newCard(idNumber, title, image, overView, rating, area) {
    let div = document.createElement("div");
    area.appendChild(div);

    div.id = `${idNumber}`;
    div.className = "movieCard";
    
    div.innerHTML = `<img src="${image}" alt="${title}" class="card-img-top">
                    <h5>${title}</h5>
                    <p> ${overView} </p>
                    <p> rating : ${rating} </p>`;

    return new Promise((resolve) => {
        setTimeout(() => {
            div.addEventListener("click", function handler() {
                alert(`영화 : ${title} , id : ${div.id}`);
                div.removeEventListener("transitionend", handler);
                resolve(div);
            });
        });
    });
}