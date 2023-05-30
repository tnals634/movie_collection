const $mycards = document.querySelector(".mycards");
const $movieCard = document.querySelector(".movieCard");
const $serchBtn = document.querySelector("#myBtn");
const $movieTitle = document.querySelector("#myText");

// -- TMDB API 사용
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTZkNjQ1M2NhYmUzMjQyMzNiZTE4NWQ2NDMyNjI2NyIsInN1YiI6IjY0NzNmN2M3ZGQ3MzFiMmQ3OWQxYzNlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NcuTmHM5yydzVpzst6vf98EHpLKloutH7zNYhSJbyJc'
    }
};

let url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
//url 패치
let fetchJson = async function (url) {
    try {
        let response = await fetch(url, options);
        let data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}
// -- 여기까지 

//화면 출력
let printMovie = function () {
    allCard();
}
//새로운 카드 생성
function newCard(idNumber, title, image, overView, rating, area) {
    let div = document.createElement("div");
    area.appendChild(div);

    div.id = `${idNumber}`;
    div.className = "movieCard";

    div.innerHTML = `<img src="${image}" alt="${title}">
                    <h3>${title}</h3>
                    <p> ${overView} </p>
                    <p> rating : ${rating} </p>`;

    return new Promise((resolve) => {
        div.addEventListener("click", function handler() {
            alert(`영화 : ${title} , id : ${div.id}`);
            div.removeEventListener("transitionend", handler);
            resolve(div);
        });
    });
}
//카드목록 다 지우기
let clearCard = function (){
    let parent = $mycards;
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}
//검색한 영화제목 카드 찾기
function findCard(movietitle) {
    fetchJson(url).then((data) => {
        let rows = data.results;
        let resultMovie;
        let str1;
        let str2 = movietitle.toUpperCase();
        let count;
        rows.forEach((a) => {
            let t = a['title'];
            str1 = t.toUpperCase();
            count = str1.search(str2);
            console.log("count check : ",count);
            if(0 <= count){
                console.log(resultMovie);
                let id = a['id'];
                let title = a['title'];
                let image = `https://www.themoviedb.org/t/p/w500/${a['poster_path']}`;
                let overView = a['overview'];
                let rating = a['vote_average'];
                
                newCard(id, title, image, overView, rating, $mycards);
            }
        })
    })
}
//검색 버튼 클릭
$serchBtn.onclick = function () {
    checkCard($movieTitle.value);
};
//엔터키 입력시 검색
function fnEnterkey(){
    if(window.event.keyCode == 13){
        checkCard($movieTitle.value);
    }
}
//모든 카드 출력
function allCard(){
    fetchJson(url).then((data) => {
        let rows = data.results;

        rows.forEach((a) => {
            let id = a['id'];
            let title = a['title'];
            let image = `https://www.themoviedb.org/t/p/w500/${a['poster_path']}`;
            let overView = a['overview'];
            let rating = a['vote_average'];

            newCard(id, title, image, overView, rating, $mycards);
        })
    });
}
//검색한 영화제목 체크
function checkCard(movietitle) {
    clearCard();
    if(!movietitle){
        printMovie = allCard();
    }else {
        printMovie = findCard(movietitle);
    }
}

printMovie();