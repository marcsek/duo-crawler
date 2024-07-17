const maxPageCount = Infinity;
const takeFirstOption = true;

let button = document.querySelector("ul li[role='button']");
let list = document.querySelector("div > section > ul");
let curPage = 1;
let result = {};

const observeChanges = (ulElement) => {
  const observer = new MutationObserver((mutationsList) => {
    if (curPage >= maxPageCount) {
      showTable(result);
      observer.disconnect();
    }
    if (mutationsList.some((m) => m.type == "childList")) {
      window.scrollTo(0, document.body.scrollHeight);

      getWords(ulElement);
      curPage += 1;
      setTimeout(() => button.click());
    }
    for (let mutation of mutationsList) {
      if (
        Array.from(mutation.removedNodes).some(
          (n) => n.getAttribute("role") === "button"
        )
      ) {
        showTable(result);
        observer.disconnect();
        break;
      }
    }
  });

  const config = { childList: true };

  observer.observe(ulElement, config);
};

observeChanges(list);

const getWords = (ulElement) => {
  ulElement.childNodes.forEach((li) => {
    if (!li.hasAttribute("role") || li.getAttribute("role") !== "button") {
      word = li.querySelector("div > div > div > h3").textContent;
      translation = li.querySelector("div > div > div > p").textContent;
      result[word] = takeFirstOption
        ? translation.split(",")[0].trim()
        : translation;
    }
  });
};

const showTable = (result) => {
  const table = document.createElement("table");

  for (word in result) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${word}</td><td>${result[word]}<td/>`;
    table.appendChild(newRow);
  }

  toReplace = document.querySelector("div");
  toReplace.parentNode.replaceChild(table, toReplace);
};
