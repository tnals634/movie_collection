const $serchBtn = document.querySelector("#myBtn");
const $movieTitle = document.querySelector("#myText");
import { findCard } from "./findMovieCard.js";
import { clearCard } from "./clearMovieCard.js";
import { allCard } from "./allMovieCard.js";

//화면 출력
let printMovie = function () {
    allCard();
}
//검색 버튼 클릭
$serchBtn.onclick = function () {
    checkCard($movieTitle.value);
};
//엔터키 입력시 검색
document.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
        checkCard($movieTitle.value);
    }
});
//검색한 영화제목 체크
function checkCard(movietitle) {
    clearCard();
    if (!movietitle) {
        printMovie = allCard();
    } else {
        printMovie = findCard(movietitle);
    }
}

printMovie();