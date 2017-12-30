import windows from '../api/windows'
import tabs from '../api/tabs'

export function getDomain(url) {
  const reg = /https?:\/\/([^\/]+):?\d*\/?/
  const resArr = reg.exec(url)

  return resArr && resArr[1] 
}

export async function focusOrCreateTab(url) {
  const wins = await windows.getAll({ "populate": true }) || []
  let existTab

  wins.forEach(index => {
    const tabs = wins[index] || []
    tabs.forEach(index => {
      const tab = tabs[index]
      if (getDomain(tab.url) === getDomain(url)) {
        existTab = tab
        return
      }
    })
  })

  const { id: tabId } = existTab || {}

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