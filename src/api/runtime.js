export default {
  set onMessage (fn) {
    chrome.runtime.onMessage.addListener(fn)
  },
  get onMessage () {
    return chrome.runtime.onMessage
  },
  sendMessage (params) {
    chrome.runtime.sendMessage(params)
  }
}
