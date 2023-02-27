"use strict";

function showSearchResult(data) {
    let resultList = document.querySelector(".search-result__list");
    
    let fuse = new Fuse(data, {
	keys: ["title", "description", "content", "url", "author"],
    });
    fuse.findAllMatches = true;
    
    let searchForm = document.querySelector("#search__form");
    searchForm.addEventListener("submit", (event) => {
	event.preventDefault();
    });
    
    let searchInput = searchForm.querySelector("input");
    searchInput.addEventListener("keyup", (event) => {
	resultList.innerHTML = "";
	
	let query = event.target.value;
	if (query.trim() === "")
	    return;
	
	let results = fuse.search(query);
	let liResult = Array.from([]);
	
	for (const result of results) {
	    let url = result.item.url;
	    let title = result.item.title;
	    let description = result.item.description;
	    let author = result.item.author;
	    let content = result.item.content;

	    let h4 = document.createElement("h4");
	    h4.textContent = title;
	    
	    let small = document.createElement("small");
	    small.textContent = `author: ${author}`;

	    let p = document.createElement("p");
	    p.textContent = description;

	    let a = document.createElement("a");
	    a.setAttribute("href", url);
	    a.appendChild(h4);
	    a.appendChild(small);
	    a.appendChild(p);
	    
	    let li = document.createElement("li");
	    li.classList.add("search-result__item");
	    li.appendChild(a)
	    liResult.push(li);
	}
	
	for (let i in liResult) {
	    resultList.appendChild(liResult[i]);
	}
    });
}

// main function
function loadData() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	    let data = JSON.parse(xhr.responseText);
	    if (data)
		showSearchResult(data.splice(0, data.length - 1));
	    else
		console.error(xhr.responseText);
	}
    };

    xhr.open("GET", "../index.json");
    xhr.send();
}

loadData();
