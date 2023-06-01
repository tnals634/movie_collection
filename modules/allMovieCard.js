import { fetchJson, url } from "./fetchJsonUrl.js";
import { newCard, $mycards } from "./createCard.js";
//모든 카드 출력
export function allCard() {
    fetchJson(url, 1).then((data) => {
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