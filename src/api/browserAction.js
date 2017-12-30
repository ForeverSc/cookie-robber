export default {
  set onClicked(fn) {
    chrome.browserAction.onClicked.addListener(fn)
  }
}