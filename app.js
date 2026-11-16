// app.js : 영화 배열을 다루는 함수 6개 / 장성민(23)/  10주차

// ===== Part A =====
//평균 평점
let sumA = 0;
for (const m of ratings) {
  sumA += m;
}
console.log("A1 평균 평점:", sumA / ratings.length);

//최고 평점
let maxA = 0;
let bigA = "";
for (const i in ratings) {
  if (ratings[i] > ratings[maxA]) maxA = i;
}
bigA = `${titles[maxA]}  ${ratings[maxA]}`;
console.log("A2 최고 평점:", bigA);

//8점 이상
console.log("A3 8점 이상: :", ratings.filter((r) => r >= 8).length);

//연도대별 영화 수
const moviesByYear = {
  "2020년대": 0,
  "2010년대": 0,
  "2000년대": 0,
  "그 이전": 0,
};
let output = "";

for (const i in years) {
  const decade = years[i] - (years[i] % 10);
  switch (decade) {
    case 2020:
      moviesByYear["2020년대"] += 1;
      break;
    case 2010:
      moviesByYear["2010년대"] += 1;
      break;
    case 2000:
      moviesByYear["2000년대"] += 1;
      break;
    default:
      moviesByYear["그 이전"] += 1;
  }
}

for (m in moviesByYear) {
  output += `${m} ${moviesByYear[m]}편, `;
}
console.log("A4 " + output);

//누적 관객 100만 이상인 영화 제목
const over100m = [];
for (const i in audiences) {
  if (audiences[i] > 1000000) over100m.push(titles[i]);
}
console.log(
  "A5 관객 100만 이상: " + (over100m.length > 0 ? over100m.join(" ") : "없음"),
);

// ===== Part B =====

//average: 배열 ⇒ 평균 평점
const average = (list) => {
  let sum = 0;
  for (const m of list) {
    sum += m.rating;
  }
  return sum / list.length;
};
console.log("B1 average: " + average(movies));

//reduceAverage: 배열 ⇒ 평균 평점
const reduceAverage = (list) => {
  return list.reduce((acc, m) => acc + m.rating, 0) / list.length;
};
console.log("B1 reduceAverage: " + reduceAverage(movies));

//best: 배열 ⇒ 최고 평점 객체
const best = (list) => {
  let max = { rating: 0 };

  for (const m of list) {
    if (m.rating > max.rating) max = m;
  }
  return max;
};
console.log("B2 best:", best(movies));

//filterByRating: 배열, 숫자 ⇒ 새 배열
const filterByRating = (list, min) => list.filter((m) => m.rating >= min);
console.log("B3 filterByRating:", filterByRating(movies, 8));

//sortBy: 배열, 키 이름, 참이면 내림차순 ⇒ 새 배열
function sortBy(list, key, desc) {
  const sign = desc ? -1 : 1;
  return [...list].sort((a, b) => {
    if (typeof a[key] === "string") return a[key].localeCompare(b[key]);
    return (a[key] - b[key]) * sign;
  });
}
console.log("B4 sortBy:", sortBy(movies, "rating", true));

//search: 배열, 문자열 ⇒ 새 배열
const search = (list, keyword) => {
  const serchedList = [];
  keyword.trim().toLowerCase();
  for (const m of list) {
    if (m.title.toLowerCase().includes(keyword)) serchedList.push(m);
  }
  return serchedList;
};
console.log("B5 search:", search(movies, "자"));

//formatNumber: 숫자나 숫자 문자열 ⇒ "1,234,567" N
const formatNumber = (n) => Number(n).toLocaleString("ko-KR");
console.log("B6 formatNumber:", formatNumber(1234567));

//yearsSince: "2014-11-06" ⇒ 올해까지 몇 년(숫자)
const yearsSince = (year) => {
  return new Date().getFullYear() - new Date(year).getFullYear();
};
console.log("B7 yearsSince:", yearsSince("2014-11-06"));

//formatDate: "2014-11-06" ⇒ 2014년 11월 6일 (목)
const formatDate = (d) => {};
console.log("B8 formatDate:", formatDate("2014-11-06"));

// (function () {
//   const average = (list) => {
//     let sum = 0;
//     for (const m of list) {
//       sum += m.rating;
//     }
//     return sum / list.length;
//   };

//   const best2 = (list) => {
//     const max = Math.max(...list.map((m) => m.rating));
//     return list.find((m) => m.rating === max);
//   };

//   const filterByRating = (list, min) => list.filter((m) => m.rating >= min);

//   const sortByRating = (list) => [...list].sort((a, b) => b.rating - a.rating);

//   const yearsSince = (dateStr) =>
//     new Date().getFullYear() - new Date(dateStr).getFullYear();

//   const posterUrl = (path, size) => "https://image.tmdb.org/t/p/" + size + path;

//   console.log("평균:", average(movies));
//   console.log("최고:", best(movies).title);
//   console.log("최고(보너스):", best2(movies).title);
//   console.log("8점 이상:", filterByRating(movies, 8).length + "편");
//   const sorted = sortByRating(movies);
//   console.log("정렬 1위:", sorted[0].title, "/ 원본 1번:", movies[0].title);
//   console.log(yearsSince(movies[0].date) + "년 전 개봉");
//   console.log(posterUrl(movies[0].poster, "w342"));

//   document.title = "내 영화 " + movies.length + "편";
//   console.table(sortByRating(movies));
//   document.getElementById("out").textContent =
//     "평균 " + average(movies).toFixed(1) + "점, 최고 " + best(movies).title;

//   const boxTop = {
//     title: "극장판 치이카와: 인어 섬의 비밀",
//     audience: 1875606,
//   };
//   console.log(
//     "박스오피스 1위 관객수: " + boxTop.audience.toLocaleString("ko-KR") + "명",
//   );

//   console.log(
//     `navigator.language=${navigator.language} location.href=${location.href}`,
//   );
//   // live Server: navigator.language=ko-KR location.href=http://127.0.0.1:5500/
//   // 깃허브 사이트: navigator.language=ko-KR location.href=https://faraaaway.github.io/web261109/
// })();
