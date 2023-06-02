const $serchBtn = document.querySelector("#myBtn");
const $movieTitle = document.querySelector("#myText");
const $webTitle = document.querySelector(".webTitle");
import { findCard } from "./findMovieCard.js";
import { clearCard } from "./clearMovieCard.js";

//화면 출력
let printMovie = function () {
    findCard("");
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
//웹페이지 제목 클릭시 돌아옴
$webTitle.onclick = function () {
    checkCard("");
    $movieTitle.value = "";
};
//검색한 영화제목 체크
function checkCard(movietitle) {
    clearCard();
    findCard(movietitle);
}
printMovie();