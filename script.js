//your code here
const issuesList = document.getElementById("issues_list");
const loadPrevButton = document.getElementById("load_prev");
const loadNextButton = document.getElementById("load_next");
let currentPage = 1;

function displayIssues(issues) {
  issuesList.innerHTML = "";
  issues.forEach((issue) => {
    const issueElement = document.createElement("li");
    issueElement.textContent = issue.title;
    issuesList.appendChild(issueElement);
  });
}

function fetchIssues(pageNumber) {
  fetch(`https://api.github.com/repositories/1296269/issues?page=${pageNumber}&per_page=5`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayIssues(data);
      currentPage = pageNumber;
      document.querySelector("h1").textContent = `Page Number ${currentPage}`;
      loadPrevButton.disabled = currentPage <= 1;
    })
    .catch((error) => {
      console.error("There was an error fetching issues", error);
    });
}

loadNextButton.addEventListener("click", () => {
  fetchIssues(currentPage + 1);
});

loadPrevButton.addEventListener("click", () => {
  fetchIssues(currentPage - 1);
});

fetchIssues(currentPage);