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
    const response = await fetch("https://api.jikan.moe/v4/top/anime");
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
  const container = document.querySelector("#cards");

  const html = `
    <div class="card-center bg-base-100 w-180 shadow-sm py-6" id="card">
      <h2 class="text-lg p-6 font-bold">${data.title_english || data.title}</h2>
      <img src="${data.images.jpg.image_url}" alt="" class="rounded">
      <p class="text-sm px-2 py-4">${data.synopsis}</p>
      <p class="cardepisode px-2">Episodes: ${data.episodes}</p>
      <p class="cardstatus px-2 pb-4">Status: ${data.status}</p>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", html);
}

data.data.forEach((item) => inject(item));

/*function inject(data) {
  //query the container
  const container = document.querySelector(".cards");
  const html = `<div class="card bg-base-100 w-96 shadow-sm">
        <h2 class="cardtitleen" >${data.title_english}</h2>
        <img src=${data.images.jpg.image_url} alt="">
        <h4 class="cardsynopsis" >${data.synopsis} </h4>
        <h4 class="cardepisode" >${data.episodes} </h4>
        <h4 class="cardstatus" >${data.status} </h4>
        <button class="cardcharacters">Open</button>
        </div>`;
  container.insertAdjacentHTML("beforeend", html);
  console.log("card");
}
function displayAnime(animeList) {
  const container = document.querySelector(".cards");
  container.innerHTML = ""; // clear previous cards


  animeList.forEach((item) => inject(item));
}*/

//data.data.forEach((item) => inject(item));
/*
document.getElementById("searchform").addEventListener("submit", function (e) {
  //Get Values
  e.preventDefault();
  let data = {};
  data.title_english = document.getElementById("title").value;
  let realTitle = false;
  data.data.forEach((item) => {
    if (item.title === data.title_english) {
      console.log(data.title_english);
      realTitle = true;
    }
  });
  if (!realTitle) {
    console.log("not real title");
  }
});
 */

async function getUserData(userSearch) {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
        userSearch
      )}&limit=1`
    );
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const json = await response.json();
      const normalizedSearch = userSearch.toLowerCase();

      const match = json.data.find(
        (item) =>
          item.title.toLowerCase().includes(normalizedSearch) ||
          (item.title_english &&
            item.title_english.toLowerCase().includes(normalizedSearch))
      );
      return json.data[0];
      /* data.data.forEach((card) => console.log(card));
      return data; */
    }
  } catch (error) {
    console.log(error);
  }
}

function find(userSearch) {
  const card = document.querySelectorAll("#card");
  let form = document.getElementById("searchform");
  console.log("form");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("working");
    userSearch = document.getElementById("title").value.trim().toLowerCase();
    /*getUserData(userSearch); */
    /* if (userSearch === `${data.title_english || data.title}`) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    } */
    const data = await getUserData(userSearch);
    if (!data) {
      alert("No results found.");
      return;
    }

    document.getElementById("cards").innerHTML = "";
    const container = document.querySelector("#cards");
    console.log(data);
    const html = `
    <div class="card bg-base-100 w-200 shadow-sm py-6" id="specificcard">
      <h2 class="text-lg p-6 font-bold">${data.title_english || data.title}</h2>
      <img src="${data.images.jpg.image_url}" alt="" class="rounded">
      <p class="text-sm px-2 py-4">${data.synopsis}</p>
      <p class="cardepisode px-2">Episodes: ${data.episodes}</p>
      <p class="cardstatus px-2 pb-4">Status: ${data.status}</p>
    </div>
  `;

    container.insertAdjacentHTML("afterbegin", html);
  });
}
find();

//clear html, show only the card searched

/* function add(x,y){
  x + y
} */
