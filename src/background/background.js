import storage from '../util/storage'
import cookies from '../api/cookies'
import runtime from '../api/runtime'
import browserAction from '../api/browserAction'
import { getDomain, focusOrCreateTab } from '../util/helper'

function getBindings() {
  return storage.get('bindings') || []
}

init()

async function init() {
  const all = getBindings() 

  all.forEach((binding) => {
    bindCookies(binding)
  })
}

async function bindCookies({ local, online }) {
  const resCookies = await cookies.getAll({ url: online }) || []
  
  resCookies.forEach(({ name, value })=> {
    cookies.set({
      url: local,
      name,
      value
    })
  })
}

runtime.onMessage = function ({ type, binding }) {

}

cookies.onChanged = function({ cookie, cause }) {
  if (cause !== 'explicit') return
  const { domain, name, value } = cookie
  const all = getBindings()

  all.forEach((binding) => {
    cookieChange(domain, name, value, binding)
  })
}

async function cookieChange(domain, name, value, { local, online, bind}) {
  if (bind && domain === getDomain(online)) {
    const targetCookie = await cookies.get({
      url: local,
      name
    })

    cookies.set({
      url: local,
      name,
      value
    }, (cookie) => {
      focusOrCreateTab(local)
    })
  }
}

browserAction.onClicked = function(tab) {
  const url = chrome.extension.getURL("settings.html");
  focusOrCreateTab(url);
}
