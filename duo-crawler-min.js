const maxPageCount = Infinity;
const takeFirstOption = true;

///
let button = document.querySelector("ul li[role='button']"),
  list = document.querySelector("div > section > ul"),
  curPage = 1,
  result = {};
const observeChanges = (e) => {
  const t = new MutationObserver((o) => {
    curPage >= maxPageCount && (showTable(result), t.disconnect()),
      o.some((e) => "childList" == e.type) &&
        (window.scrollTo(0, document.body.scrollHeight),
        getWords(e),
        (curPage += 1),
        setTimeout(() => button.click()));
    for (let e of o)
      if (
        Array.from(e.removedNodes).some(
          (e) => "button" === e.getAttribute("role")
        )
      ) {
        showTable(result), t.disconnect();
        break;
      }
  });
  t.observe(e, { childList: !0 });
};
observeChanges(list);
const getWords = (e) => {
    e.childNodes.forEach((e) => {
      (e.hasAttribute("role") && "button" === e.getAttribute("role")) ||
        ((word = e.querySelector("div > div > div > h3").textContent),
        (translation = e.querySelector("div > div > div > p").textContent),
        (result[word] = takeFirstOption
          ? translation.split(",")[0].trim()
          : translation));
    });
  },
  showTable = (e) => {
    const t = document.createElement("table");
    for (word in e) {
      const o = document.createElement("tr");
      (o.innerHTML = `<td>${word}</td><td>${e[word]}<td/>`), t.appendChild(o);
    }
    (toReplace = document.querySelector("div")),
      toReplace.parentNode.replaceChild(t, toReplace);
  };
