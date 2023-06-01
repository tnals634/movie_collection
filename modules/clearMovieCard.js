import { $mycards } from "./createCard.js";
//카드목록 다 지우기
export let clearCard = function () {
    let parent = $mycards;
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}