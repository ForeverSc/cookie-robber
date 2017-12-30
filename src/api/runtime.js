export default {
  set onMessage(fn) {
    chrome.runtime.onMessage.addListener(fn)
  }
}