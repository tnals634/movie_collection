export const $mycards = document.querySelector(".mycards");
//새로운 카드 생성
export function newCard(idNumber, title, image, overView, rating, area) {
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