document.getElementById("checkHTMLPreview").addEventListener("click", () => {
  check();
});

var second = false;

function check() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let url = tabs[0].url;

    var test1 = url.match(/^(https:\/\/github.com)/g);
    var test2 = url.match(/(\.html?)$/g);

    if (second) {
      chrome.tabs.query({ currentWindow: true, active: true }, (tabArray) => {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabArray[0].id },
            files: ["content-script.js"],
          },
          (results) => {
            if (results[0].result.is != null) {
              chrome.tabs.create({
                url:
                  "http://htmlpreview.github.io/?https://github.com" +
                  results[0].result.link,
              });
            }
          }
        );
      });
    }

    if (!test1) {
      document.getElementById("checkHTMLPreview").innerHTML =
        "<strong>Not a GitHub page.</strong>";
      document.getElementById("checkHTMLPreview").style.whiteSpace = "nowrap";
      document.getElementById("checkHTMLPreview").style.color = "red";
    } else if (!test2) {
      if (!second) {
        document.getElementById("checkHTMLPreview").innerHTML =
          "Please link to the .html page! <br><strong>Click to find index.html</strong>";
        document.getElementById("checkHTMLPreview").style.whiteSpace = "nowrap";
        document.getElementById("checkHTMLPreview").style.color = "red";
        second = true;
      }
    } else {
      chrome.tabs.create({
        url: "http://htmlpreview.github.io/?" + url,
      });
    }
  });
}
