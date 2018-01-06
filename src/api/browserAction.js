export default {
  set onClicked (fn) {
    chrome.browserAction.onClicked.addListener(fn)
  },
  get onClicked () {
    return chrome.browserAction.onClicked
  }
}
