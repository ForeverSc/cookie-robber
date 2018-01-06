export default {
  set (details, cb) {
    chrome.cookies.set(details, cb)
  },
  get (details) {
    return new Promise((resolve, reject) => {
      chrome.cookies.get(details, (cookies) => {
        resolve(cookies)
      })
    })
  },
  getAll (details) {
    return new Promise((resolve, reject) => {
      chrome.cookies.getAll(details, (cookies) => {
        resolve(cookies)
      })
    })
  },
  set onChanged (fn) {
    chrome.cookies.onChanged.addListener(fn)
  },
  get onChanged () {
    return chrome.cookies.onChanged
  }
}
