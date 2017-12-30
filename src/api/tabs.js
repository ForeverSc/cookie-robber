export default {
  update(params) {
    chrome.tabs.update(params)
  },
  reload(params) {
    chrome.tabs.reload(params)
  },
  create(params) {
    chrome.tabs.create(params)
  }
}