export default {
  set (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get (key) {
    if (!localStorage.getItem(key)) return null
    return JSON.parse(localStorage.getItem(key))
  }
}
