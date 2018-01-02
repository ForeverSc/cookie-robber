export default {
  set onMessage(fn) {
    chrome.runtime.onMessage.addListener(fn)
  },
  sendMessage(params) {
    chrome.runtime.sendMessage(params)
  }
}