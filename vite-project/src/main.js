import "./style.css";
/* import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`; */

// setupCounter(document.querySelector("#counter"));

// const URL = "https://api.jikan.moe/v4/top/anime?type=ona";

// async function getData(URL) {
//   try {
//     const response = await fetch(URL);
//     if (response.status != 200) {
//       throw new Error(response);
//     } else {
//       const data = await response.json(); //makes the data into JSON object we can use
//       console.log(data);
//       document.getElementById("api-response").textContent = data.name;
//     }
//   } catch (error) {
//     console.log(error);
//     console.log("no bueno");
//   }
// }
// getData(URL);

async function getAllData() {
  try {
    const response = await fetch("https://api.jikan.moe/v4/top/anime?type=ona");
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      data.data.forEach((card) => console.log(card));
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
const data = await getAllData();

function inject(data) {
  //query the container
  const container = document.querySelector(".container");
  const html = `<div class="card" data-title="${data.title_english}">
        <h2 class="cardtitleen" >${data.title_english}</h2>
        <img src=${data.images.jpg.image_url} alt="">
        <h4 class="cardsynopsis" >${data.synopsis} </h4>
        <h4 class="cardepisode" >${data.episodes} </h4>
        <h4 class="cardstatus" >${data.status} </h4>
        </div>`;
  container.insertAdjacentHTML("afterbegin", html);
  console.log("card");
}

data.data.forEach((item) => inject(item));
