export default {
  getAll (params) {
    return new Promise((resolve, reject) => {
      chrome.windows.getAll(params, windows => {
        resolve(windows)
      })
    })
  }
}
