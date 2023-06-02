import { fetchJson, url } from "./fetchJsonUrl.js";
import { newCard, $mycards } from "./createCard.js";

//검색한 영화제목 카드 찾기
export function findCard(movietitle) {
    for (let pageNumber = 1; pageNumber <= 500; pageNumber++) {
        if(!movietitle){
            pageNumber = 1;
        }
        fetchJson(url, pageNumber).then((data) => {
            let rows = data.results;
            let inputTitle = movietitle.toUpperCase();
            let rowsTitle = rows.filter((value) => {
                let rowsTitleUpper = value['title'].toUpperCase();
                let count = rowsTitleUpper.search(inputTitle);
                if (-1 < count) {
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
        if(!movietitle) break;
    }
}