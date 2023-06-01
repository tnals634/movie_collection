// -- TMDB API 사용
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTZkNjQ1M2NhYmUzMjQyMzNiZTE4NWQ2NDMyNjI2NyIsInN1YiI6IjY0NzNmN2M3ZGQ3MzFiMmQ3OWQxYzNlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NcuTmHM5yydzVpzst6vf98EHpLKloutH7zNYhSJbyJc'
    }
};

export let url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=';

//url 패치
export let fetchJson = async function (url, pageNumber) {
    try {
        let response = await fetch(url + `${pageNumber}`, options);
        let data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}
// -- 여기까지 