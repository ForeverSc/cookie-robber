export default {
  set(params) {
    chrome.cookies.set(params)
  },
  get(params) {
    return new Promise((resolve, reject) => {
      chrome.cookies.get(params, (cookies) => {
        resolve(cookies)
      })
    })
  },
  getAll(params) {
    return new Promise((reslove, reject) => {
      chrome.cookies.getAll(params, (cookies) => {
        resolve(cookies)
      })
    })
  },
  set onChanged(fn) {
    chrome.cookies.onChanged.addListener(fn)
  }
}