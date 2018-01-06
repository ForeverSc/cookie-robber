export default {
  update (tabId, updateProperties, cb) {
    chrome.tabs.update(tabId, updateProperties, cb)
  },
  reload (tabId, updateProperties, cb) {
    chrome.tabs.reload(tabId, updateProperties, cb)
  },
  create (createProperties, cb) {
    chrome.tabs.create(createProperties, cb)
  }
}
