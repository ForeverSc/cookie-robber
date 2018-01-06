import windows from '../api/windows'
import tabs from '../api/tabs'
import storage from './storage'

export function getBindings () {
  return storage.get('bindings')
}

export function getDomain (url) {
  const reg = /chrome-extension|https?:\/\/([^\/]+):?\d*\/?/
  const resArr = reg.exec(url)

  return resArr && resArr[1]
}

export async function focusOrCreateTab (url) {
  const wins = await windows.getAll({ 'populate': true }) || []
  let existTab = {}

  wins.forEach(({ tabs = [] }) => {
    tabs.forEach(tab => {
      if (getDomain(tab.url) === getDomain(url)) {
        existTab = tab
      }
    })
  })

  const { id: tabId } = existTab

  if (tabId) {
    tabs.update(tabId, { 'selected': true })
    tabs.reload(tabId)
  } else {
    tabs.create({
      url,
      'selected': true
    })
  }
}
