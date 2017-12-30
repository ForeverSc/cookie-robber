import storage from '../util/storage'
import cookies from '../api/cookies'
import runtime from '../api/runtime'
import browserAction from '../api/browserAction'
import { getDomain, focusOrCreateTab } from '../util/helper'

let robberURL = storage.get('robber')
let hostageURL = storage.get('hostage')

init()

async function init() {
  if (!robberURL || !hostageURL) return
  const resCookies = await cookies.getAll({ url: hostageURL }) || []
  
  res.cookies.forEach(({ name, value })=> {
    cookies.set({
      url: robberURL,
      name,
      value
    })
  })
}

runtime.onMessage = function (req) {
  if (req.type === 'rob-hostage') {
    robberURL = req.robber
    hostageURL = req.hostage
  }
}

cookies.onChanged = async function(info = {}) {
  const { domain, name, value } = info.cookie
  if (domain === getDomain(hostageURL)) {
    const targetCookie = await cookies.get({
      url: robberURL,
      name
    })

    cookies.set({
      url: robberURL,
      name,
      value
    })
    focusOrCreateTab(robberURL)
  }
}

browserAction.onClicked = function(tab) {
  const url = chrome.extension.getURL("settings.html");
  focusOrCreateTab(url);
}
