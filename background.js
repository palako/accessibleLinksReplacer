function main() {
  collectLinkParents();
  replaceParagraphs();
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func : main
  });
});