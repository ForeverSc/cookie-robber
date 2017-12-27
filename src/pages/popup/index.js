const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key))
  } 
}

document.addEventListener('DOMContentLoaded', function DOMContentLoaded() {
  const bind = document.querySelector('#bind')
  const robber = document.querySelector('#robber')
  const hostage = document.querySelector('#hostage')

  load()
  bind.addEventListener('click', function() {
    const robberVal = robber.value
    const hostageVal = hostage.value

    storage.set('robber', robberVal)
    storage.set('hostage', hostageVal)
    chrome.runtime.sendMessage({
      type: 'rob-hostage',
      robber: robberVal, 
      hostage: hostageVal
    })
  })
})

function load() {
  const robber = document.querySelector('#robber')
  const hostage = document.querySelector('#hostage')

  robber.value = storage.get('robber')
  hostage.value = storage.get('hostage')
  if (robber.value && hostage.value) {
    chrome.runtime.sendMessage({
      type: 'rob-hostage',
      robber: robber.value, 
      hostage: hostage.value
    })
  }
}