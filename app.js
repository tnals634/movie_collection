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

//url 패치
let url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=';

let fetchJson = async function (url , pageNumber) {
    try {
        let response = await fetch(url+`${pageNumber}`, options);
        let data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

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

    //innerhtml로 카드 안 내용 생성
    div.innerHTML = `<img src="${image}" alt="${title}">
                    <h3>${title}</h3>
                    <p> ${overView} </p>
                    <p> rating : ${rating} </p>`;

    return new Promise((resolve) => {
        div.addEventListener("click", function handler() {
            //영화 카드를 눌렀을 시 알림창이 뜨면서 id값을 알려줍니다.
            alert(`영화 : ${title} , id : ${div.id}`);
            div.removeEventListener("transitionend", handler);
            resolve(div);
        });
    });
}
//카드목록 다 지우기
let clearCard = function (){
    let parent = $mycards;
    //부모에서 첫 자식을 찾을때마다 지웁니다.
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}
//검색한 영화제목 카드 찾기
function findCard(movietitle) {
    //이게 맞는지는 모르겠으나 일단 구현했습니다.
    //영화 페이지가 최대 500페이지라서 500까지 돌렸습니다.
    //for문을 돌려서 각 페이지마다 검색
    for(let pageNumber = 1; pageNumber <= 500; pageNumber++){
        fetchJson(url , pageNumber).then((data) => {
            let rows = data.results;
            let inputTitle = movietitle.toUpperCase();
            //filter로 변경
            let rowsTitle = rows.filter((value) => {
                let a = value['title'].toUpperCase();
                let count = a.search(inputTitle);
                if(-1 < count){
                    return value;
                }
            })
            rowsTitle.forEach((a) => {
                let id = a['id'];
                let title = a['title'];
                let image = `https://www.themoviedb.org/t/p/w500/${a['poster_path']}`;
                let overView = a['overview'];
                let rating = a['vote_average'];
                
                newCard(id, title, image, overView, rating, $mycards);
                    
            })
            
        })
    }
}
//검색 버튼 클릭시 이벤트
$serchBtn.onclick = function () {
    checkCard($movieTitle.value);
};
//엔터키 클릭시 이벤트
document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        checkCard($movieTitle.value);
    }
});
//모든 카드 출력
function allCard(){
    //첫페이지 전체 출력
    fetchJson(url , 1).then((data) => {
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