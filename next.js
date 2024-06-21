const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".new-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-item").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

fetch('data.json').then(Response => Response.json()).then(data => {
  const container = document.getElementById('cards-container');
  data.forEach(person => {

    const card = document.createElement('div');
    card.className = "card";

    const leftbox = document.createElement("div");
    leftbox.className = 'leftbox';
    card.appendChild(leftbox)

    const image = document.createElement("img")
    image.textContent = person.image;
    leftbox.appendChild(image)

    const rightbox = document.createElement('div');
    rightbox.className = "rightbox";
    card.appendChild(rightbox)

    const name = document.createElement('h2');
    name.textContent = person.name;
    rightbox.appendChild(name);

    const about = document.createElement("p");
    about.textContent = person.about;
    rightbox.appendChild(about)

    const box = document.createElement("div");
    box.className = "last";
    rightbox.appendChild(box)

    const icon = document.createElement("img");
    icon.textContent = person.icon;
    box.appendChild(icon)

    const span = document.createElement("span");
    span.textContent = person.span;
    box.appendChild(span)

    container.appendChild(card);
  });
})
.catch(error => console.error('Errorloading json:',error));


let data = [];
let currentCategory = 'all';

// fetching data 
fetch('data.json')
    .then(response => response.json())
    .then(json => {
        data = json;
        updateCounts();
        filterData('all'); 
    })
    .catch(error => console.error('Error fetching data:', error));

// Function 
// to update counts for each category
function updateCounts() {
    document.getElementById('count-all').innerText = data.length;
    document.getElementById('count-games').innerText = data.filter(item => item.category === 'games').length;
    document.getElementById('count-entertainment').innerText = data.filter(item => item.category === 'entertainment').length;
    document.getElementById('count-sports').innerText = data.filter(item => item.category === 'sports').length;
    document.getElementById('count-music').innerText = data.filter(item => item.category === 'music').length;
    document.getElementById('count-education').innerText = data.filter(item => item.category === 'education').length;
    document.getElementById('count-tech').innerText = data.filter(item => item.category === 'tech').length;


}

// Function to filter and display data based on category
function filterData(category) {
    currentCategory = category;
    searchData();
}

// Function to search and display data based on search input
function searchData() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const display = document.getElementById('data-display');
    display.innerHTML = '';

    let filteredData = data;

    //category filter
    if (currentCategory !== 'all') {
        filteredData = filteredData.filter(item => item.category === currentCategory);
    }

    // search filter
    filteredData = filteredData.filter(item => item.name.toLowerCase().includes(searchInput));

    // result count title
    document.getElementById('result-count').innerText = `${filteredData.length} Results Found`;

    //filtered data
    filteredData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'data-item';

        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;

        imgContainer.appendChild(img);

        const contentContainer = document.createElement('div');
        contentContainer.className = 'content-container';

        const title = document.createElement('h3');
        title.innerText = item.name;

        const icon = document.createElement('img');
        icon.src = item.icon;
        icon.alt = 'icon';
        icon.className = 'item-icon';

        title.appendChild(icon);

        const paragraph = document.createElement('p');
        paragraph.innerText = item.paragraph;

        const button = document.createElement('button');
        button.innerText = item.buttonText;

        contentContainer.appendChild(title);
        contentContainer.appendChild(paragraph);
        contentContainer.appendChild(button);

        div.appendChild(imgContainer);
        div.appendChild(contentContainer);

        display.appendChild(div);
    });
}
document.getElementById('search-bar').addEventListener('input', searchData);
